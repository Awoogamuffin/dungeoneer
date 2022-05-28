import { DmFetchParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
export declare class QueryGenerator {
    constructor();
    generateQuery(params: DmFetchParams, schema: Schema): string;
    getNodeVars(schema: Schema, nodeType: string, modality: string): string;
    getFilters(filterVars: string[], schema: Schema, params: DmFetchParams, nodeType: string): string[];
}
