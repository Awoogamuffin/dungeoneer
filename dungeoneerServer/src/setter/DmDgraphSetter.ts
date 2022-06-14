import { Mutation } from "dgraph-js";
import { dungeoneerSchema } from "dungeoneer-common";
import { DmLinkSetParams, DmSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { NodeType, NodeVar } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { fullLog } from "../../index.js";
import { DmSetMutations } from "../database/DmDgraphClient";

export async function generateMutations(params: DmSetParams): Promise<DmSetMutations | null> {
    if (!params.nodeType && params.values) {
        throw new Error('set function requires both nodeType and values to be sent');
    }

    // not included yet, but we could "clean" the values by checking:
    // - are all the keys actually in the schema?
    // - are node values only passing uid? (passing more than uid would represent an additional edit)

    // not doing those checks now because I'm already taking too long.
    // for the purposes of this early stage I'm just relying on the values being sent by the client being correct.

    const values: any = params.values;

    // this is the actual node being added or edited. There may be other nodes (child or child[])
    const mainNodeSet: any = {};
    // the array of all nodes being added / modified
    const toSet: any = [];
    // the array of all deletions (links or nodes themselves in the case of cihld, child[])
    const toDelete: any = [];

    if (!dungeoneerSchema.nodeTypes[params.nodeType]) {
        throw new Error(`Schema for ${params.nodeType} not found in setter`);
    }

    const nodeSchema: NodeType = dungeoneerSchema.nodeTypes[params.nodeType];

    // if no uid provided, this is a new node. Otherwise we are editing existing node
    mainNodeSet.uid = '_:added';
    if (values.uid) {
        mainNodeSet.uid = values.uid;
    }

    // now we loop through the values and make any changes required due to the nodeVar type.
    // right now it's here, but when I add child and child[] types this will be a function that can be called recursively
    for (const key of Object.keys(values)) {
        if (key === 'uid') {
            continue;
        }
        const varSchema: NodeVar = nodeSchema.nodeVars[key];

        if (!varSchema) {
            throw new Error(`No nodevar schema found for key ${key} in nodetype ${params.nodeType}`);
        }

        switch(varSchema.type) {
            case 'string':
                // prepend the key with the nodeType
                mainNodeSet[params.nodeType + '_' + key] = values[key];
                // this is the crappy workaround to allow regex searches for values less than three characters long
                mainNodeSet[params.nodeType + '_' + key + '_search'] = '&&' + values[key];
                break;

            case 'node[]':
                console.log('TIME TO SET NODE TYPE!', values[key]);
                const linkSetParams: DmLinkSetParams = values[key] as DmLinkSetParams;

                // with node[] types we only need to delete the link. For child[] we need to delete both the link and the child itself.
                if (linkSetParams.toDelete) {
                    const deletionArray: any[] = [];
                    for (const toDelete of linkSetParams.toDelete) {
                        if (toDelete.uid) {
                            deletionArray.push({
                                uid: toDelete.uid
                            });
                        }
                    }

                    if (deletionArray.length > 0) {
                        toDelete.push({
                            uid: mainNodeSet.uid,
                            [params.nodeType + '_' + key]: deletionArray
                        })
                    }
                }

                const linkArray: any[] = [];

                if (linkSetParams.toModify) {
                    // for node[] type this should only be modifying facets. We assume the client sent it in the right format
                    linkArray.push(...linkSetParams.toModify);
                }

                if (linkSetParams.toAdd) {
                    // Again, we assume the client sent it in the right format
                    linkArray.push(...linkSetParams.toAdd);
                }

                if (linkArray.length > 0) {
                    mainNodeSet[params.nodeType + '_' + key] = linkArray;
                }

                break;

            default:
                // prepend the key with the nodeType
                mainNodeSet[params.nodeType + '_' + key] = values[key];
        }
    }

    if (mainNodeSet.uid === '_:added') {
         // internal dgraph type used for searches and whatnot. (not necessary if editing)
         mainNodeSet['dgraph.type'] = params.nodeType;
    }
    
    toSet.push(mainNodeSet);

    const setMu: Mutation = new Mutation();
    setMu.setSetJson(toSet);

    const deleteMu: Mutation = new Mutation();
    deleteMu.setDeleteJson(toDelete);

    return {
        delete: deleteMu,
        set: setMu
    };
}