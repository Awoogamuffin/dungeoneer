// the schema struct informs the database and the client how to store and display the data.
export interface Schema {
	nodeTypes: {
        [key: string]: NodeType
    }
}


// nodetype is equivalent to a table in SQL databases.
export interface NodeType {
	nodeVars: {
        [key: string]: NodeVar
    }

	// label var indicates which value in NodeVars is to be used for labels (in tables etc.)
	// If this is not set "name" is used (if a name var exists)
	labelVar?: string

	// an array of which variables can be edited by the client. The client will not allow you to edit this nodetype if this is not specified
	edit?: string[]

	// a list of node vars that will appear in table columns. Relevant for 'table' modality fetches. If not set then all variables are assumed to be included.
	columns?: string[]

	// Here we define which search vars the user can search by
	search?: string[]

	// Joins inform the query generator how to link from one nodetype to this
	// specific nodetype. See the JoinDefinition and JoinStep interfaces.
	// The key of the map is the value within the search parameters which will
	// almost always be the name of the nodeType. It's not impossible
	// that we might need different paths from the same node type in very specific conditions.
	joins?: {
        [key: string]: JoinDefinition
    }

	// modalities override default fetch settings for the named modality (e.g. minimal might include a different predicate)
	// you can have custome modalities here which will be specified in the FetchParams
	modalities?: {
		[key: string]: any
	}
}

export interface NodeVar {
	// The type of the variable. These types we get to define as need arises.
	type: 'node' | 'node[]' | 'string' | 'float' | 'int' | 'child' | 'child[]' | 'date' | 'time' | 'datetime' | 'boolean' | 'text'

	// Label to be displayed in client. If omitted then the value name from the
	// nodevars map is used.
	label?: string
	
	// required value for types that correspond to an edge (such as "node"
	// "child" "node[]" and "child[]")
	nodeType?: string

	// for node[] or child[] types you can add variables directly onto the link itself
	facets?: Facet[]

	// any constraints on the value are put here
	validation?: Validation

	// requireved value for "select" type
	options?: SelectOptions[]
}

export interface Facet {
	// name of facet variable
	name: string

	// eventually I'll add the full list of supported variable types
	type: 'int' | 'float' | 'string'

	// potential default value if necessary
	default?: any
}

export interface JoinDefinition {
	// the steps taken to get from the original NodeType to the target NodeType.
	joinSteps: JoinStep[]
}

export interface JoinStep {
	// which node type this step of the join path is on
	nodeType: string

	// how to get to the next NodeType. This could be a reverse edge
	varName: string
}

// the validation type will be expanded as we add more controls for datatypes
export interface Validation {
	// set to true if this value must be unique
	unique?: boolean

	required?: boolean

	// min length refers to chars for a string but number of items of an array
	minLength?: number

	// max length refers to chars for a string but number of items of an array
	maxLength?: number
}

export interface SelectOptions {
	value: string

	label: string
}
