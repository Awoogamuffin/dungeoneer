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
                // Character descriptive properties
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
                // Character Health State
                hitPointsMax: {
                    type: 'int',
                    label: 'Hit Point Max',
                    validation: {
                        required: true
                    } 
                },
                hitPointsCurrent: {
                    type: 'int',
                    label: 'Hit Points',
                },
                hitPointsTemp: {
                    type: 'int',
                    label: 'Temp. Hit Points',
                },
                hitDiceTotal: {
                    type: 'int',
                    label: 'Total Hit Dice',
                    validation: {
                        required: true
                    } 
                },
                hitDiceCurrent: {
                    type: 'int',
                    label: 'Current Hit Dice',
                },
                deathSuccesses: {
                    type: 'int',
                    label: 'Successes',
                },
                deathFailures: {
                    type: 'int',
                    label: 'Failures',
                },
                // Character Abilities
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
                // Character Attributes
                isJackOfAllTrades: {
                    type: 'boolean',
                    label: 'Jack Of All Trades?'
                },
                // Skill proficiencies - hack, store array as csv string...
                skillProficiencies: {
                    type: 'string'
                },
                // Skill expertise - hack, store array as csv string...
                skillExpertise: {
                    type: 'string'
                },
                // Saving Throw proficiencies - hack, store array as csv string...
                savingProficiencies: {
                    type: 'string'
                },
                bio: {
                    type: 'text'
                },
                // Inventory
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
            edit: ['name', 'class', 'level', 'race', 'bio', 'isJackOfAllTrades', 'items', 'skillProficiencies', 'skillExpertise', 'savingProficiencies'],

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

/**
 * @returns A deep copy of the dungeoneerSchema (i.e. without passing references to child objects)
 */
export function getDungeoneerSchema(): Schema {
    return JSON.parse(JSON.stringify(dungeoneerSchema));
}