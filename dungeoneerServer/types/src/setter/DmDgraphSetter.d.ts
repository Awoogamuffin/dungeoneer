import { DmSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { DmSetMutations } from "../database/DmDgraphClient";
export declare function generateMutations(params: DmSetParams, schema: Schema): Promise<DmSetMutations | null>;
export declare function getSetArrays(params: DmSetParams, schema: Schema): Promise<{
    toSet: any[];
    toDelete: any[];
}>;
