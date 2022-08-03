import * as http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { DmWebSocket } from './DmWebsocket';
import { DmRequest, DmResponse } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { handleRequest } from './handleRequest.js';

export class DmWebSocketServer {
    wsServer: WebSocketServer;

    constructor(private port: number) {

        console.log('creating websocket server');
        // creating basic web socket server on provided port
        const server: http.Server = http.createServer();
        this.wsServer = new WebSocketServer({ server });
        server.listen(this.port);

        this.wsServer.on('connection', (dmws: DmWebSocket) => {
            console.log('client connected');
            dmws.isAlive = true;

            dmws.send(JSON.stringify({
                message: 'client connection received'
            }));

            // isAlive is reset to true every time we got a pong from our pings (see below)
            dmws.on('pong', () => {
                dmws.isAlive = true;
            });

            dmws.on('message', (requestBinary: DmRequest) => {
                try {
                    console.log('should have reached break point');
                    const request = JSON.parse(requestBinary.toString());
                    // this.emit('message', data);
                    // whatever the request, we send a message received signal
                    if (request.id) {
                        const messageReceived: DmResponse = {
                            id: request.id,
                            data: { messageReceived: true }
                        }
                        dmws.send(JSON.stringify(messageReceived))
                    }
                    
                    // now we shuffle the request on to the request manager, where it's ultimate fate will be decided.
                    handleRequest(request, dmws, this);
                } catch(e) {
                    console.warn('error receiving message', e);
                }
                
            });
        });

        // interval pings each websocket to check connection is still good
        setInterval(() => {
            this.wsServer.clients.forEach((wso: WebSocket) => {
                let dmws: DmWebSocket = wso as DmWebSocket;

                // if isAlive hasn't been reset to true due to receiving a pong, then we assume the connection is dosn and close the connection
                if (!dmws.isAlive) {
                    console.log('terminating connection');
                    return dmws.terminate();
                }
                // here we set "isAlive" to false, but if we get a pong message before the next interval it will be set back to true
                dmws.isAlive = false;
                if (dmws && dmws.readyState === WebSocket.OPEN) {
                    try {
                        dmws.ping(null, false);
                    } catch(e) {
                        console.warn('error while sending to client', e);
                    }
                }
            });
        }, 4000);
    }

    broadcast(message: DmResponse) {

        const toSend: string = JSON.stringify(message);
        this.wsServer.clients.forEach((wso: WebSocket) => {
            let dmws: DmWebSocket = wso as DmWebSocket;

            dmws.send(toSend);
        });
    }
}