import { DmSetParams } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { DmSetMutations } from "../database/DmDgraphClient";
export declare function generateMutations(params: DmSetParams): Promise<DmSetMutations | null>;
