import { Schema } from "./src/schema/schemaTypes";
export const dungeoneerSchema: Schema = {
    nodeTypes: {
        item: {
            nodeVars: {
                myString: {
                    type: "string",
                    label: "Testing strings",
                    validation: {
                        required: true
                    }
                },
                myInt: {
                    label: "Testing ints",
                    type: 'int'
                }
            },

            search: ['myString'],
            columns: ['myString', 'myInt'],
            edit: ['myString', 'myInt']
        }
    }
}