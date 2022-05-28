import { DmFetchParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
export interface testData {
    name: string;
    fetchParams: DmFetchParams;
    expected: string;
    shouldError?: string;
    schema: Schema;
}
export declare const queryGeneratorTests: testData[];
