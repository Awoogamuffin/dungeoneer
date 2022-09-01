import { DmLinkSetParams, DmSetParams } from "dungeoneer-common"
import { Schema } from "dungeoneer-common"

const setterSchema1: Schema = {
	nodeTypes: {
		"person": {
			//maybe predicades
			nodeVars: {
				"name": {
					type: "string",
				},
				"lastname": {
					type: "string",
				},
				"location": {
					type:     "node",
					nodeType: "location",
				},
			},

			columns: ["name", "location"],
			edit: ["name", "lastname", "location"],

			joins: {
				"continent": {
					joinSteps: [
						{
							nodeType: "continent",
							varName:  "~continent",
						},
						{
							nodeType: "location",
							varName:  "~location",
						},
                    ],
				},
			},
		},

		"location": {
			nodeVars: {
				"name": {
					type: "string",
				},

				"continent": {
					type:     "node",
					nodeType: "continent",
				},
			},
		},

		"continent": {
			nodeVars: {
				"name": {
					type: "string",
				},
			},
		},

		"event": {
			nodeVars: {
				"name": {
					type: "string",
				},
				"date": {
					type: "date",
				},
				"attendees": {
					type: "node[]",
					nodeType: "person",
				},
			},

			columns: ["name", "date"],
		},
	},
}

const setterSchema2: Schema = {
	nodeTypes: {
		"person": {
			nodeVars: {
				"name": {
					type: "string",
				},
				"lastname": {
					type: "string",
				},
				"itemsToSell": {
					type: "child[]",
					nodeType: "itemToSell",
				},
			},

			joins: {
				"itemsToSell": {
					joinSteps: [
						{
							nodeType: "itemToSell",
							varName:  "~itemsToSell",
						},
                    ],
				},
			},

			edit: ["name", "lastname", "itemsToSell"],
		},

		"itemToSell": {
			nodeVars: {
				"name": {
					type: "string",
				},
				"price": {
					type: "int",
				},
			},
		},
	},
}


export interface setterTestdata {
	name: string

	setParams: DmSetParams

    expected: string

	shouldError?: string

	schema: Schema
}
export const setterTests: setterTestdata[] = [{
    name: 'basic set',
    setParams: {
        nodeType: 'person',
        values: {
            'name': 'Michael',
            'lastname': 'Beeson'
        }
    },
    schema: setterSchema1,
    expected: JSON.stringify({
		toSet: [{
        uid: '_:added',
        'person_name': 'Michael',
		'person_name_search': '&&Michael',
        'person_lastname': 'Beeson',
		'person_lastname_search': '&&Beeson',
		'dgraph.type': 'person'
    }],
	toDelete: []}) },
	
	{
		name: 'set with children',
		setParams: {
			nodeType: 'person',
			values: {
				'uid': '0x5',
				'name': 'Alan',
				'itemsToSell': <DmLinkSetParams>{
					toDelete: [{
						'uid': '0x1a'
					}, {
						'uid': '0x1c'
					}],
					toModify: [{
						'uid': '0x8',
						'itemToSell_price': 550
					}],
					toAdd: [{
						'itemToSell_name': 'spoon',
						'itemToSell_price': 430
					}]
				}
			}
		},
		expected: JSON.stringify({
			toSet: [
				{
					'uid': '0x5',
					'person_name': 'Alan',
					'person_name_search': '&&Alan',
					'person_itemsToSell': [{
						'uid': '0x8',
						'itemToSell_price': 550
					}, {
						'itemToSell_name': 'spoon',
						'itemToSell_price': 430
					}]
				}
			],
			toDelete: [{
					'uid': '0x1a'
				}, {
					'uid': '0x1c'
				},
				{
					'uid': '0x5',
					'person_itemsToSell': [{
						'uid': '0x1a'
					}, {
						'uid': '0x1c'
					}]
				}
			]
		}),
		schema: setterSchema2

	}
]