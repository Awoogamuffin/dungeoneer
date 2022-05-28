import { DmFetchParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes"
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes"

const schema1: Schema = {
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

const schemaWithChildren: Schema = {
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

export interface testData {
	name: string

	fetchParams: DmFetchParams

    expected: string

	shouldError?: string

	schema: Schema
}

export const queryGeneratorTests: testData[] = [
	{
		name: "simple search",
		fetchParams: {
			nodeType: "person",
			modality: "table",
		},
		expected: `{
			var(func: type(person)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "uid search",
		fetchParams: {
			nodeType: "person",
			search: {
				"uid": "0x1",
			},
			modality: "full",
		},
		expected: `{
			var(func: uid(0x1)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_lastname
				person_location {
					uid location_name
				}
				person_name
			}
		}`,
		schema: schema1,
	},
	{
		name: "simple pagination",
		fetchParams: {
			nodeType: "person",
			pagination: {
				offset: 3,
				first:  5,
			},
			modality: "table",
		},
		expected: `{
			var(func: type(person)) {
				initial as uid
			}
	
			person(func: uid(initial), offset: 3, first: 5) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "join search",
		fetchParams: {
			nodeType: "person",
			search: {
				"continent": {
					"uid": "0x4",
				},
			},
			modality: "table",
		},
		expected: `{
			var(func: uid(0x4)) {
				~continent @filter(type(location)) {
					~location @filter(type(person)) {
						initial as uid
					}
				}
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "regex search",
		fetchParams: {
			nodeType: "person",
			search: {
				"name": "Alo",
			},
			modality: "table",
		},
		expected: `{
			var(func: regexp(person_name_search, /Alo/i)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "regex search with value < 3 characters",
		fetchParams: {
			nodeType: "person",
			search: {
				"name": "A",
			},
			modality: "table",
		},
		expected: `{
			var(func: regexp(person_name_search, /&&A/i)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "filter override search",
		fetchParams: {
			nodeType: "person",
			search: {
				"name": "Alo",
			},
			modality: "table",
			filterOverride: {
				"name": "eq",
			},
		},
		expected: `{
			var(func: eq(person_name, "Alo")) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "full modality without uid error",
		fetchParams: {
			nodeType: "person",
			modality: "full",
			search: {
				"name": "Alo",
			},
		},
		expected:    ``,
		shouldError: `full modality should provide a specific uid to fetch`,
		schema:      schema1,
	},
	{
		name: "minimal modality",
		fetchParams: {
			nodeType: "person",
		},
		expected: `{
			var(func: type(person)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "regex multi search",
		fetchParams: {
			nodeType: "person",
			search: {
				"name":     "Alo",
				"lastname": "Ber",
			},
			modality: "table",
		},
		expected: `{
			var(func: regexp(person_lastname_search, /Ber/i)) @filter(regexp(person_name_search, /Alo/i)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "join search",
		fetchParams: {
			nodeType: "person",
			search: {
				"continent": {
					"uid": "0x4",
				},
				"name": "Alo",
			},
			modality: "table",
		},
		expected: `{
			var(func: uid(0x4)) {
				~continent @filter(type(location)) {
					~location @filter(type(person) AND regexp(person_name_search, /Alo/i)) {
						initial as uid
					}
				}
			}
	
			person(func: uid(initial)) {
				uid
				person_location {
					uid location_name
				}
				person_name
			}
	
			person_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "date search",
		fetchParams: {
			nodeType: "event",
			search: {
				date: {
					from: "2021-11-01T00:00:00.000Z",
					to:   "2021-11-05T00:00:00.000Z",
				},
			},
			modality: "table",
		},
		expected: `{
			var(func: ge(event_date, "2021-11-01")) @filter(le(event_date, "2021-11-05")) {
				initial as uid
			}
	
			event(func: uid(initial)) {
				uid
				event_date
				event_name
			}
	
			event_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "date search with nil to value",
		fetchParams: {
			nodeType: "event",
			search: {
				"date": {
					"from": "2021-11-01T00:00:00.000Z",
					"to":   null,
				},
			},
			modality: "table",
		},
		expected: `{
			var(func: ge(event_date, "2021-11-01")) {
				initial as uid
			}
	
			event(func: uid(initial)) {
				uid
				event_date
				event_name
			}
	
			event_total(func: uid(initial)) {
				total: count(uid)
			}
		}`,
		schema: schema1,
	},
	{
		name: "uid fetch with collection",
		fetchParams: {
			nodeType: "event",
			search: {
				"uid": "0x4",
			},
			modality: "full",
		},
		expected: `{
			var(func: uid(0x4)) {
				initial as uid
			}
	
			event(func: uid(initial)) {
				uid
				event_attendees {
					uid
					person_name
				}
				event_date
				event_name
			}
		}`,
		schema: schema1,
	},
	{
		name: "fetch with children",
		fetchParams: {
			nodeType: "person",
			search: {
				"uid": "0x4",
			},
			modality: "full",
		},
		expected: `{
			var(func: uid(0x4)) {
				initial as uid
			}
	
			person(func: uid(initial)) {
				uid
				person_itemsToSell {
					uid
					itemToSell_name
					itemToSell_price
				}
				person_lastname
				person_name
			}
		}`,
		schema: schemaWithChildren,
	},
]
