import { DmSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
export interface setterTestdata {
    name: string;
    setParams: DmSetParams;
    expected: string;
    shouldError?: string;
    schema: Schema;
}
export declare const setterTests: setterTestdata[];
