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
                class: {
                    type: 'string',
                    label: 'Class',
                    validation: {
                        required: true
                    } 
                },
                level: {
                    type: 'int',
                    label: 'Level',
                    validation: {
                        required: true
                    } 
                },
                race: {
                    type: 'string',
                    label: 'Race',
                    validation: {
                        required: true
                    } 
                },
                background: {
                    type: 'string',
                    label: 'Background',
                    validation: {
                        required: true
                    } 
                },
                alignment: {
                    type: 'string',
                    label: 'Alignment',
                    validation: {
                        required: true
                    } 
                },
                experience: {
                    type: 'int',
                    label: 'Experience',
                    validation: {
                        required: true
                    } 
                },
                inspiration: {
                    type: 'int',
                    label: 'Inspiration',
                    validation: {
                        required: true
                    } 
                },
                abilityStrength: {
                    type: 'int',
                    label: 'Strength',
                    validation: {
                        required: true
                    }
                },
                abilityDexterity: {
                    type: 'int',
                    label: 'Dexterity',
                    validation: {
                        required: true
                    }
                },
                abilityConstitution: {
                    type: 'int',
                    label: 'Constitution',
                    validation: {
                        required: true
                    }
                },
                abilityIntelligence: {
                    type: 'int',
                    label: 'Intelligence',
                    validation: {
                        required: true
                    }
                },
                abilityWisdom: {
                    type: 'int',
                    label: 'Wisdom',
                    validation: {
                        required: true
                    }
                },
                abilityCharisma: {
                    type: 'int',
                    label: 'Charisma',
                    validation: {
                        required: true
                    }
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
            edit: ['name', 'class', 'level', 'race', 'items', 'abilityStrength'],

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