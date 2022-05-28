import { Mutation } from "dgraph-js";
import { dungeoneerSchema } from "dungeoneer-common";
import { DmSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { NodeType, NodeVar } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
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
    const toSet: any = {}

    if (!dungeoneerSchema.nodeTypes[params.nodeType]) {
        throw new Error(`Schema for ${params.nodeType} not found in setter`);
    }

    const nodeSchema: NodeType = dungeoneerSchema.nodeTypes[params.nodeType];

    // now we loop through the values and make any changes required due to the nodeVar type.
    for (const key of Object.keys(values)) {

        if (key === 'uid') {
            toSet.uid = values.uid;
            continue;
        }
        const varSchema: NodeVar = nodeSchema.nodeVars[key];

        if (!varSchema) {
            throw new Error(`No nodevar schema found for key ${key} in nodetype ${params.nodeType}`);
        }

        switch(varSchema.type) {
            case 'string':
                // prepend the key with the nodeType
                toSet[params.nodeType + '_' + key] = values[key];
                // this is the crappy workaround to allow regex searches for values less than three characters long
                toSet[params.nodeType + '_' + key + '_search'] = '&&' + values[key];

            default:
                // prepend the key with the nodeType
                toSet[params.nodeType + '_' + key] = values[key];
        }
    }

    if (!toSet.uid) {
        // we can use the _:added uid to retrieve the uid after the transaction
        toSet.uid = '_:added';

         // internal dgraph type used for searches and whatnot. (not necessary if editing)
        toSet['dgraph.type'] = params.nodeType;
    }
   
    console.log('TO SET', toSet);

    const setMu: Mutation = new Mutation();
    setMu.setSetJson(toSet);

    return {
        delete: null,
        set: setMu
    };
}