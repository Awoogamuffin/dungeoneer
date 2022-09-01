import { DgraphClient, DgraphClientStub, Response } from "dgraph-js";
import { Mutation } from "dgraph-js/generated/api_pb";
import { Schema } from "dungeoneer-common";
import { BehaviorSubject } from "rxjs";
import { DmDatabaseClient } from "./DmDatabaseClient";
export declare class DmDgraphClient implements DmDatabaseClient {
    private schema;
    databaseReady: BehaviorSubject<boolean>;
    clientStub: DgraphClientStub;
    dgraphClient: DgraphClient;
    constructor(schema: Schema);
    initialise(): Promise<void>;
    connectAndLoadSchema(): Promise<any>;
    getSettings(): Promise<void>;
    sendQuery(query: string): Promise<any>;
    setData(mutations: DmSetMutations): Promise<DmSetResponses>;
    loadSchema(schema: Schema): Promise<any>;
}
export interface DmSetMutations {
    delete: Mutation | null;
    set: Mutation;
}
export interface DmSetResponses {
    delResponse: Response | null;
    setResponse: Response | null;
}
