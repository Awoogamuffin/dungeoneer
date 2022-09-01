import { DmSetParams } from "dungeoneer-common";
import { Schema } from "dungeoneer-common";
export interface setterTestdata {
    name: string;
    setParams: DmSetParams;
    expected: string;
    shouldError?: string;
    schema: Schema;
}
export declare const setterTests: setterTestdata[];
