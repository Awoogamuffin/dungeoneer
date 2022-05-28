import { BehaviorSubject } from 'rxjs';
import { DmSetMutations, DmSetResponses } from './DmDgraphClient';
/**
 * Interface for the client, which for now is dgraph but could be swapped out with whatever in theory...
 */
export interface DmDatabaseClient {
    databaseReady: BehaviorSubject<boolean>;
    sendQuery(query: string): Promise<any>;
    setData(mutations: DmSetMutations): Promise<DmSetResponses>;
}
