import { DmFetchParams } from "dungeoneer-common";
import { Schema } from "dungeoneer-common";
export declare class QueryGenerator {
    constructor();
    generateQuery(params: DmFetchParams, schema: Schema): string;
    getNodeVars(schema: Schema, nodeType: string, modality: string): string;
    getFilters(filterVars: string[], schema: Schema, params: DmFetchParams, nodeType: string): string[];
}
