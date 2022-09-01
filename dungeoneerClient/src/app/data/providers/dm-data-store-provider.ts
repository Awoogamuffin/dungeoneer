import { DmFetchParams } from "dungeoneer-common";
import { BehaviorSubject } from "rxjs";
import { DmDataObject, DmDataProvider } from "../dm-data-provider";
import { DmDataStoreService } from "../dm-data-store.service";

export class DmDatabaseProvider extends DmDataProvider {

    constructor(private dmData: DmDataStoreService) {
        super();
        this.initialized = dmData.initialized;
    }

    override getData(request: string): BehaviorSubject<DmDataObject | null> {
        return this.dmData.getData(request);
    }

    override fetchData(fetchParams: DmFetchParams, request: string) {
        this.dmData.fetchData(fetchParams, request);
    }
}