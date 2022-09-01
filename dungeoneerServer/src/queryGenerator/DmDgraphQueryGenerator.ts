import { DmFetchParams } from "dungeoneer-common";
import { JoinStep, NodeType, Schema } from "dungeoneer-common";
import { DateTime } from 'luxon';

export function  generateQuery(params: DmFetchParams, schema: Schema): string {
    if (!params) {
        throw new Error('fetch params not provided to query generator');
    }

    // first get all the schema infomration
    const nodeType: string = params.nodeType
    if (!nodeType || nodeType == '') {
        throw new Error('no nodetype provided in fetch');
    }

    const nodeSchema: NodeType = schema.nodeTypes[nodeType]
    if (!nodeSchema) {
        throw new Error('no nodeType found for main query ' + nodeType);
    }

    let modality = params.modality
    if (!modality) {
        modality = 'minimal'
    }

    let query = "{\n";

    //handle search parameters. For now only uid search is implemented
    const search = params.search

    let searchFuncInitialized = false

    if (search) {
        if (search.uid) {
            query += `var(func: uid(${search.uid})) {\ninitial as uid\n}\n`;

            searchFuncInitialized = true
        } else if (modality == 'full') {
            throw new Error('full modality should provide a specific uid to fetch')
        }

        const searchJoins: string[] = [];
        const filterVars: string[] = [];

        for (const searchKey of Object.keys(search)) {

            if (nodeSchema.joins && nodeSchema.joins[searchKey]) {
                searchJoins.push(searchKey);
                continue;
            }

            if (nodeSchema.nodeVars && nodeSchema.nodeVars[searchKey]) {
                filterVars.push(searchKey);
            }
        }

        // sorting required for consistency in test results
        searchJoins.sort();
        filterVars.sort();

        /* So now we first have to handle joins, then check direct filters.
        We establish the initial func, hopefully as limiting as possible, then apply other filters. */

        const filters = getFilters(filterVars, schema, params, nodeType);

        // first handle joins
        if (nodeSchema.joins && searchJoins.length > 0) {

            // FOR NOW JUST DOING ONE JOIN, BUT I'LL GET TO MULTIPLE JOINS SOON ENOUGH
            const join = search[searchJoins[0]];
            if (join) {
                const joinSteps = nodeSchema.joins[searchJoins[0]].joinSteps;
                query += `var(func: uid(${join.uid})) {\n`;
                for (let i = 0; i < joinSteps.length; i++) {
                    const step: JoinStep = joinSteps[i];

                    if (i + 1 < joinSteps.length) {
                        query += `${step.varName} @filter(type(${joinSteps[i+1].nodeType})) {\n`;
                    } else {
                        let filterString = '';
                        if (filters.length > 0) {
                            filterString = ' AND ' + filters.join(' AND ');
                        }
                        query += `${step.varName} @filter(type(${nodeType})${filterString}) {\n`;
                    }
                }
                query += 'initial as uid  }\n'
                for (let i = 0; i < joinSteps.length; i++) {
                    query += "}\n"
                }
                searchFuncInitialized = true
            }
        }

        if (!searchFuncInitialized && filters.length > 0) {
            query +=`var(func: ${filters[0]})`;
            if (filters.length > 1) {
                query += ` @filter(${filters.slice(1).join(' AND ')})`;
            }
            query += " {\ninitial as uid\n}\n"

            searchFuncInitialized = true
        }
    }

    if (!searchFuncInitialized) {
        query += `var(func: type(${nodeType})) {\ninitial as uid\n}\n`;
    }

    let pagination: string = '';
    if (params.pagination) {
        pagination = `, offset: ${params.pagination.offset}, first: ${params.pagination.first}`;
    }

    query += `${nodeType}(func: uid(initial)${pagination}) {\nuid\n`;

    switch(modality) {}
    if (modality === 'minimal') {
        const labelVar = nodeSchema.labelVar || 'name';
        query += `${nodeType}_${labelVar}\n`;
    } else {
        query += getNodeVars(schema, nodeType, modality);
    }

    query += "}\n";

    if (modality !== "full") {
        query += `${nodeType}_total(func: uid(initial)) { total: count(uid) }\n`;
    }

    query += "}";

    if (params.filterOverride) {
        console.log(query);
    }

    return query;
}
    
function getNodeVars(schema: Schema, nodeType: string, modality: string): string {
    let query = '';

    const nodeSchema = schema.nodeTypes[nodeType]
    if (!nodeSchema) {
        throw new Error('no nodeType found for main query ' + nodeType);
    }
    const nodeVars = nodeSchema.nodeVars;

    let nodeVarNames: string[];
    
    switch(modality) {
        case 'minimal':
            nodeVarNames = [nodeSchema.labelVar || 'name'];
            break;

        case 'table':
            nodeVarNames = nodeSchema.columns || Object.keys(nodeSchema.nodeVars);
            break;

        case 'full':
            nodeVarNames = Object.keys(nodeSchema.nodeVars);
            break;

        default:
            console.warn('Unrecognised modality: ', modality);
            return '';
    }

    // sort required for consistency in testing
    nodeVarNames.sort();

    for (const nodeVarName of nodeVarNames) {

        const nodeVar = nodeVars[nodeVarName]

        switch (nodeVar.type) {
            case "child[]":
            case "child":
                // we need to fetch all values of children nodes. Hence the recursion
                // setting no modality means minimal. This could be overridden if necessary

                if (!nodeVar.nodeType) {
                    throw new Error('nodetype value not set in child schema');
                }

                query += `${nodeType}_${nodeVarName} { uid\n`;
                const childQuery = getNodeVars(schema, nodeVar.nodeType, "full");
                query += childQuery + "\n}\n";
                break;
    
            case "node":
            case "node[]":
    
                if (nodeVar.type === 'node[]' && modality !== 'full') {
                    continue
                }

                if (!nodeVar.nodeType) {
                    throw new Error('nodetype value not set in node schema');
                }
                // single node connections are of type uid, and we need to follow the edge and, using the schema, establish which properties to fetch
                const edgeSchema = schema.nodeTypes[nodeVar.nodeType]
    
                if (!edgeSchema) {
                    throw new Error('no nodeType found for edge ' + nodeVar.nodeType);
                }

                // for now just retrieving the uid and label, but we may well need to fetch a lot more depending on modality
                let label = edgeSchema.labelVar || 'name';
                query += `${nodeType}_${nodeVarName} `;


                if (nodeVar.facets) {
                    query += '@facets ';
                }
                
                query += `{\nuid\n`;
                query += `${nodeVar.nodeType}_${label}\n`;

                // I'm adding this hack here quickly, but really this needs to be fixed by implementing modalities
                if (nodeVar.nodeType === 'item') {
                    query += `${nodeVar.nodeType}_weight\n`
                }
    
                query += "}\n";
                break;
    
            default:
                // if nothing defined above, simply return the value as is (with nodeType prefix)
                query += `${nodeType}_${nodeVarName}\n`;
            }
    }

    return query;
}
    
function getFilters(filterVars: string[], schema: Schema, params: DmFetchParams, nodeType: string): string[] {
    
    const search = params.search;

    const filters: string[] = [];
    for (const filterVar of filterVars) {
        const nodeVarSchema = schema.nodeTypes[nodeType]?.nodeVars[filterVar];

        if (!nodeVarSchema) {
            continue;
        }

        let value = search[filterVar]

        if (value === null || value === undefined) {
            continue
        }

        switch (nodeVarSchema.type) {
            case 'string':
                if (!(typeof value === 'string' || value instanceof String)) {
                    throw new Error('value passed to ' + filterVar + ' is not a string');
                }
                if (value === '') {
                    continue;
                }
                if (params.filterOverride) {
                    const override = params.filterOverride[filterVar];
                    if (override) {
                        switch(override) {
                            case 'eq':
                                filters.push(`eq(${nodeType + '_' + filterVar}, "${value}")`);
                                break;

                            // case insensitive search uses regex instead on the _search string, adding the leading ampersands
                            case 'eq/i':
                                filters.push(`regexp(${nodeType+"_"+filterVar}_search, /^&&${value}$/i)`);
                                break;
                        }

                        break;
                    }
                }
                while (value.length < 3) {
                    value = '&' + value;
                }
                filters.push(`regexp(${nodeType+"_"+filterVar}_search, /${value}/i)`);
                break;

            case "date":
                if (!value && value.from) {
                    throw new Error('date search requires a from value');
                }

                // should add some logic here to make sure the date is formatted correctly. We assume the input is ISO formatted
                const parsedFrom = DateTime.fromISO(value.from);

                if (!parsedFrom.isValid) {
                    throw new Error('from date was invalid: ' + value.from);
                }

                filters.push(`ge(${ nodeType + '_' + filterVar}, "${parsedFrom.toFormat('yyyy-MM-dd')}")`);
    
                if (value.to) {
                    const parsedTo = DateTime.fromISO(value.to);
                    if (!parsedTo.isValid) {
                        throw new Error('to date was invalid: ' + value.to);
                    }
                    filters.push(`le(${nodeType+"_"+filterVar}, \"${parsedTo.toFormat('yyyy-MM-dd')}\")`);
                }
                break;

            default:
                console.warn('don\'t have filter logic for type of ', nodeVarSchema.type);
        }
    }

    return filters
}