import { DmFetchParams, DmRequest, DmResponse } from "dungeoneer-common";
import { dungeoneerSchema } from "dungeoneer-common";
import { dbc } from "../../index.js";
import { DmSetMutations, DmSetResponses } from "../database/DmDgraphClient.js";
import { generateQuery } from "../queryGenerator/DmDgraphQueryGenerator.js";
import { generateMutations } from "../setter/DmDgraphSetter.js";
import { DmWebSocket } from "./DmWebsocket.js";
import { DmWebSocketServer } from "./DmWebsocketServer.js";

export async function handleRequest(request: DmRequest, dmws: DmWebSocket, server: DmWebSocketServer) {
    
    switch(request.method) {
        
        case 'fetch':
            if (!request.id) {
                // no point fetching if there's no response id available
                return;
            }
            try {
                if (!request.params.fetch) {
                    sendErrorMessage(dmws, 500, 'No fetch params sent', request.id, request.params);
                    return;
                }
                const query = await generateQuery(request.params.fetch, dungeoneerSchema);
                const result = await dbc.sendQuery(query);
            
                const fetchResponse: DmResponse = {
                    id: request.id,
                    result: result
                }
                dmws.send(JSON.stringify(fetchResponse));
            } catch(e) {
                console.warn('unable to fetch request', e);
                sendErrorMessage(dmws, 500, 'Unable to run fetch request', request.id, request.params);
            }
            break;

        case 'set':
            if (!(request.params.set.nodeType && request.params.set.values)) {
                sendErrorMessage(dmws, 400, 'nodeType and values required', request.id, request.params);
                return;
            }

            try {
                const mutations: DmSetMutations | null = await generateMutations(request.params.set, dungeoneerSchema);
                if (mutations) {
                    const responses: DmSetResponses = await dbc.setData(mutations);

                    // retrieve uid. Either it was part of values (as an edit) or it's retrieved from the uids map (we set added uids to '_:added')
                    let uid: string | undefined = request.params.set.values.uid;
                    if (!uid) {
                        if (responses.setResponse) {
                            uid = responses.setResponse.getUidsMap().get('added');
                        }
                    }

                    // If the set has been successful, we now fetch the full item, and broadcast it to the clients
                    if (uid) {
                        await broadcastEditedItem(dmws, server, request.params.set.nodeType, uid);
                    }
                    

                }
            } catch(e) {
                console.warn('unable to set data', e);
                sendErrorMessage(dmws, 500, 'Unable to run fetch request', undefined, request.params)
            }
            break;

        default:
            console.warn(`method ${request.method} was not recognised`)
            sendErrorMessage(dmws, 400, `method ${request.method} was not recognised`, request.id, request.params);
            
    }
}

export function sendErrorMessage(dmws: DmWebSocket, code: number, message: string, id?: string, data?: any) {
    const errorResponse: DmResponse = {
        error: {
            code: code,
            message: message,
            data: data,
        }
    }
    if (id) {
        errorResponse.id = id;
    }
    
    dmws.send(JSON.stringify(errorResponse));
}

export async function broadcastEditedItem(dmws: DmWebSocket, server: DmWebSocketServer, nodeType: string, uid: string) {
    const fetchParams: DmFetchParams = {
        nodeType: nodeType,
        search: {
            uid: uid
        },
        modality: 'full'
    }
    const query = await generateQuery(fetchParams, dungeoneerSchema);

    try {
        const result = await dbc.sendQuery(query);
        if (result && result[nodeType]) {
            const editedResponse: DmResponse = {
                result: {
                    modified: nodeType,
                    item: result[nodeType]
                }
            }
            server.broadcast(editedResponse);
        }
    } catch(e) {
        sendErrorMessage(dmws, 500, `${e}`);
    }
}