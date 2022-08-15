import { DgraphClient, DgraphClientStub, Response, grpc, Operation } from "dgraph-js";
import { Mutation } from "dgraph-js/generated/api_pb";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { BehaviorSubject } from "rxjs";
import { DmDatabaseClient } from "./DmDatabaseClient";

export class DmDgraphClient implements DmDatabaseClient {

    // the database is considered ready when it has successfully connected and loaded the schema.
    databaseReady = new BehaviorSubject<boolean>(false);

    clientStub!: DgraphClientStub;
    dgraphClient!: DgraphClient;

    constructor(private schema: Schema) {
        this.initialise();
        
    }

    async initialise() {
        await this.connectAndLoadSchema();

        console.log('connection established');
        // we broadcast the database client is ready for action!
        this.databaseReady.next(true);
    }

    // returns a promise that resolves once connection to the database has been established.
    async connectAndLoadSchema(): Promise<any> {

        const attemptConnection = async (): Promise<boolean> => {
            try {
                // create the client. This tpyically throws no errors
                this.clientStub = new DgraphClientStub(process.env.dgraphurl, grpc.credentials.createInsecure());
                this.dgraphClient = new DgraphClient(this.clientStub);

                // load the schema. Also might throw errors
                await this.loadSchema(this.schema);

                // fetch settings (and also check connection is working). Will return error if connection is no good
                await this.getSettings();

                // if we got through all that without errors, the database is now ready to go!
                return true;
            } catch(e: any) {
                console.warn('attempted connection failed');
                if(this.clientStub) {
                    this.clientStub.close();
                }
                return false;
            }
        }

        const connected = await attemptConnection();

        // if connection fails, retry every two seconds until it's successful
        if (!connected) {
            const reconnectInterval = setInterval(async () => {
                console.log('trying to connect to database again');
                const connected = await attemptConnection();
                if (connected) {
                    clearTimeout(reconnectInterval);
                    return;
                }
            }, 2000)
        }
    }

    // get settings from the database. Also serves as a check that the database is running
    async getSettings() {
        const settingsQuery = `{
            settings(func: type(settings)) {
                uid
            }
        }`;

        const result = await this.sendQuery(settingsQuery);

        if (result.settings && result.settings[0]) {
            console.log('settings are', result.settings[0]);
        } else {
            console.log('no settings retrieved');
        }  
    }

    async sendQuery(query: string): Promise<any> {
        try {

            const res: Response = await this.dgraphClient.newTxn({ readOnly: true }).query(query);
            const result: any = res.getJson();
            
            return result;

        } catch(e: any) {
            // these codes are just what I've garnered from a couple of quick tests. Can't seem to find a list of error codes for the dgraph client
            if (e && e.code) {
                switch(e.code) {
                    case 2:
                        throw new Error(`Dgraph syntax error. Query was: ${query}, ${e}`);

                    case 14:
                        throw new Error('Dgraph connection error');

                    default:
                        throw new Error(`Other dgraph error: ${e}`);
                } 
            }

            throw e;
        }
    }

    async setData(mutations: DmSetMutations): Promise<DmSetResponses> {
        const txn = this.dgraphClient.newTxn();
        let delResponse: Response | null = null;
        let setResponse: Response | null = null;
        try {
            if (mutations.delete) {
                delResponse = await txn.mutate(mutations.delete);
            }
    
            setResponse = await txn.mutate(mutations.set);
            await txn.commit();
        } catch(e) {
            throw new Error(`unable to set ${e}`);
        } finally {
            await txn.discard();

            return {
                delResponse: delResponse,
                setResponse: setResponse
            }
        }
        
    }

    async loadSchema(schema: Schema): Promise<any> {
        let alterStrings: string[] = [];

        for (const [nodeTypeName, nodeType] of Object.entries(schema.nodeTypes)) {
            let typeString = `type ${nodeTypeName} {\n`;
            for (const [varName, nodeVar] of Object.entries(nodeType.nodeVars)) {
                typeString += `${nodeTypeName}_${varName}\n`;
                switch (nodeVar.type) {
                    case 'date':
                        alterStrings.push(`${nodeTypeName}_${varName}: datetime @index(day) .`);
                        break;
        
                    case 'time':
                    case 'datetime':
                        alterStrings.push(`${nodeTypeName}_${varName}: datetime datetime @index(hour) .`);
                        break;
        
                    case 'node':
                    case 'child':
                        alterStrings.push(`${nodeTypeName}_${varName}: uid @reverse .`);
                        break;

                    case 'boolean':
                        alterStrings.push(`${nodeTypeName}_${varName}: bool .`);
                        break;
        
                    case 'node[]':
                    case 'child[]':
                        alterStrings.push(`${nodeTypeName}_${varName}: [uid] @reverse .`);
                        break;

                    case 'int':
                        alterStrings.push(`${nodeTypeName}_${varName}: int @index(int) .`);
                        break;

                    case 'text':
                        // for larger blocks of text (e.g. character bio). In the client this will provide a textarea for editing
                        // in dgraph it will be stored with a full text index, so these larger texts can be searched with very forgiving tokens.
                        alterStrings.push(`${nodeTypeName}_${varName}: string @index(fulltext) .`)
                        break;

                    case 'string':
                        // a workaround to do with regex limitations (and also apparently it's bad form to have two indexes on the same property)
                        // strings have term index directly, or regex index for the same variable with _search appended. See the setter for how these
                        // are added
                        alterStrings.push(`${nodeTypeName}_${varName}: string @index(term) .`);
                        alterStrings.push(`${nodeTypeName}_${varName}_search: string @index(trigram) .`);
                        break;
        
                    default:
                        console.warn('Don\'t know what to do with type', nodeVar.type)
                }
            }

            typeString += `}`;
            alterStrings.push(typeString);

            
        }

        const op = new Operation();
        op.setSchema(alterStrings.join('\n'));
        
        console.log(alterStrings.join('\n'));

        try {
            await this.dgraphClient.alter(op);
        } catch(e: any) {
            console.warn('alter error', e.details);
            throw(e);
        }
    }
}


export interface DmSetMutations {
    delete: Mutation | null,
    set: Mutation
}

export interface DmSetResponses {
    delResponse: Response | null
    setResponse: Response | null
}