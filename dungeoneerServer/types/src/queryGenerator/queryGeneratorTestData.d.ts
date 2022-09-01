import { DmFetchParams } from "dungeoneer-common";
import { Schema } from "dungeoneer-common";
export interface testData {
    name: string;
    fetchParams: DmFetchParams;
    expected: string;
    shouldError?: string;
    schema: Schema;
}
export declare const queryGeneratorTests: testData[];
