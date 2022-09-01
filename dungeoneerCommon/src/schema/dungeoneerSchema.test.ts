
import { dungeoneerSchema } from "./dungeoneerSchema";
import { NodeType, NodeVar } from "./schemaTypes";

describe('Testing schema', () => {
    it('test correct formatting of schema', () => {

        for (const nodeTypeKey of Object.keys(dungeoneerSchema.nodeTypes)) {
            const nodeType: NodeType = dungeoneerSchema.nodeTypes[nodeTypeKey];
            for (const arr of ['edit', 'columns', 'search']) {
                if (nodeType.hasOwnProperty(arr)) {
                    const array: any = nodeType[arr as 'edit' | 'search' | 'columns']
                    for (const key of array) {
                        if (!nodeType.nodeVars[key]) {
                            throw new Error(`Error in configuration of ${nodeTypeKey}. The ${arr} array contains the key ${key}, which is not defined in nodeVars`)
                        }
                    }
                }
            }

            for (const nodeVarKey of Object.keys(nodeType.nodeVars)) {
                const nodeVar: NodeVar = nodeType.nodeVars[nodeVarKey];

                switch(nodeVar.type) {
                    case 'child':
                    case 'child[]':
                    case 'node':
                    case 'node[]':
                        if (!nodeVar.hasOwnProperty('nodeType')) {
                            throw new Error(`Error in configuration of ${nodeTypeKey} -> ${nodeVarKey}: Nodevars of type ${nodeVar.type} must include a 'nodeType' variable`);
                        }
                }
            }
        }
    })
});