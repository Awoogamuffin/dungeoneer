import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { DmFetchParams, DmResponse } from "dungeoneer-common/dist/types/src/connection/connectionTypes";
import { Observable } from "rxjs";
import { AppInjector } from "../app.module";
import { DmWebSocketService } from "../connection/dm-web-socket.service";

export class DmUniqueValidator implements AsyncValidator {

    nodeType: string;
    key: string;
    uid!: string;

    dmWebSocketClient: DmWebSocketService;

    currentPromise!: Promise<ValidationErrors | null> | Observable<any | ValidationErrors | null>
    prevValue: any;

    constructor(nodeType: string, key: string, inputData: any) {
        this.nodeType = nodeType;
        this.key = key;

        this.dmWebSocketClient = AppInjector.get(DmWebSocketService);

        console.log('input data', inputData);
        // if we are editing, store the uid of the item we are editing.
        if (inputData && inputData.uid) {
            this.uid = inputData.uid;
        }
    }

    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<any | ValidationErrors | null> {
        if (this.prevValue === ctrl.value && this.currentPromise) {
            return this.currentPromise;
        }
        this.prevValue = ctrl.value;
        // create a case insensitive equality search
        const fetchParams: DmFetchParams = {
            nodeType: this.nodeType,
            search: {
                [this.key]: ctrl.value || ""
            },
            filterOverride: {
                [this.key]: 'eq/i'
            }
        }

        this.currentPromise = new Promise(resolve => {
            this.dmWebSocketClient.sendRequest({
                method: 'fetch',
                params: {
                  fetch: fetchParams
                }
              }, (response: DmResponse) => {

                // check if the search resulted in anything
                if (response && 
                response.result &&
                response.result[this.nodeType] &&
                response.result[this.nodeType].length > 0) {

                    // ignore the result if it's the item we are currently editing
                    if (this.uid &&
                    response.result[this.nodeType].length === 1 &&
                    response.result[this.nodeType][0].uid === this.uid) {
                        resolve(null);
                        return;
                    }

                    // otherwise we've failed the uniqueness test
                    resolve({
                        unique: {
                            valid: false
                        }
                    });
                    return;
                }
                resolve(null);
            });
        });

        return this.currentPromise;
    }
}