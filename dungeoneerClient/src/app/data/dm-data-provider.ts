import { DmFetchParams } from "dungeoneer-common";
import { BehaviorSubject, Subject } from "rxjs";


export interface DmDataObject {
    data: any,
    total?: number
}

export class DmDataProvider {

    /**
     * This class is used by components, such as tables, and defines how the data is to be interacted with.
     * 
     * The data could be from the dm-data-store service, where each function is a call to the server or from a custom provider.
     * 
     * These other providers, which inherit from this class, could provide data unique to the client, or take an array from the server,
     * but perform all subsequent pagination and filtering in the client. 
     */

    initialized = new BehaviorSubject<boolean>(false);
    unsubscribeAll: Subject<void> = new Subject();

    constructor() {
    }

    close() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    /**
     * @param request key value for data (which may change, hence the behaviour subject)
     * @returns behaviour subject to be subscribed to
     */
    getData(request: string): BehaviorSubject<DmDataObject | null> {
        console.warn('no overridden function for getData', request);
        return new BehaviorSubject<DmDataObject | null>(null);
    }

    /**
     * @param fetchParams fetch params specify table and search filters. Could be handled by the client or the server
     * @param request the request name for the key value that will be affected
     */
    fetchData(fetchParams: DmFetchParams, request: string) {
        console.warn('no overridden function for fetchData', fetchParams, request);
    }
}