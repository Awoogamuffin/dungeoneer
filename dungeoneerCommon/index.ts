import { Schema } from "./src/schema/schemaTypes";
export const dungeoneerSchema: Schema = {
    nodeTypes: {
        item: {
            nodeVars: {
                name: {
                    type: 'string',
                    validation: {
                        required: true,
                        unique: true
                    }
                },
                weight: {
                    type: 'int'
                }
            },

            labelVar: 'name',
            search: ['name'],
            columns: ['name', 'weight'],
            edit: ['name', 'weight']
        },

        character: {
            nodeVars: {
                name: {
                    type: 'string',
                    validation: {
                        required: true
                    } 
                } ,
                constitution: {
                    type: 'int'
                },
                items: {
                    type: 'node[]',
                    nodeType: 'item',
                    facets: [{
                        name: 'amount',
                        // I'm 90% sure that the number of items carried is always a whole number. If not, we can always switch this to float.
                        // furthermore, for dgraph it doesn't matter. Facets get recreated with every edit and dgraph will adapt to whatever data is sent
                        type: 'int',
                        default: 1
                    }]
                }
            },

            search: ['name'],
            columns: ['name'],
            edit: ['name', 'constitution', 'items'],

            modalities: {
                full: {
                    items: {
                        name: true,
                        weight: true
                    }
                }
            }
        },

        town: {
            nodeVars: {
                name: {
                    type: "string",
                    validation: {
                        required: true
                    }
                },
                country: {
                    type: "string",
                },
                population: {
                    type: 'int'
                }
            },
        
            search: ['name'],
            columns: ['name', 'country', 'population'],
            edit: ['name', 'country', 'population']
        }
    }
}