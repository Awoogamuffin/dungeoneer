import { Injectable } from '@angular/core';
import { dungeoneerSchema } from 'dungeoneer-common';
import { DmFetchParams, DmResponse } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { BehaviorSubject } from 'rxjs';
import { DmWebSocketService } from '../connection/dm-web-socket.service';
import { DmDataObject } from './dm-data-provider';

/**
 * This service is the data store for data fetched from the database.
 * 
 * It automatically updates data based on edits made on the server
 */

@Injectable({
  providedIn: 'root'
})
export class DmDataStoreService {

  data: { [key: string]: BehaviorSubject<DmDataObject | null> } = {};

  uidRequests: { [key: string]: boolean } = {};

  initialized = new BehaviorSubject<boolean>(false);

  // connects a request to node types
  requestsToNodeType: any = {};

  // same as above, but reversed
  nodeTypesToRequests: any = {};

  constructor(private dmWebsocket: DmWebSocketService) {
    this.dmWebsocket.connected.subscribe((data) => {
      console.log('websocket connected!', data);
      this.initialized.next(data);
    });

    this.listenForEdits();
  }


  getData(name: string): BehaviorSubject<DmDataObject | null> {
    if (!this.data[name]) {
      this.data[name] = new BehaviorSubject<DmDataObject | null>(null);
    }
    return this.data[name];
  }

  fetchData(fetchParams: DmFetchParams, requestName: string) {

    if (fetchParams.search && fetchParams.search.uid) {
      this.uidRequests[requestName] = fetchParams.search.uid;
    }

    this.dmWebsocket.sendRequest({
      method: 'fetch',
      params: {
        fetch: fetchParams
      }
    }, (response: DmResponse) => {
      if (response && response.result) {
        if (fetchParams.nodeType) {
          const resultDataObj: DmDataObject = {
            data: response.result[fetchParams.nodeType]
          }
          if (response.result[fetchParams.nodeType + '_total']) {
            resultDataObj.total = response.result[fetchParams.nodeType + '_total'][0].total;
          }
          this.setData(requestName, resultDataObj);
        }
      }
    }, requestName);

    if (fetchParams.nodeType) {
      const nodeType = fetchParams.nodeType;
      if (!this.nodeTypesToRequests.hasOwnProperty(nodeType)) {
        this.nodeTypesToRequests[nodeType] = [];
      }
      if (!this.requestsToNodeType.hasOwnProperty(requestName)) {
        this.requestsToNodeType[requestName] = nodeType;
        if (this.nodeTypesToRequests[nodeType].indexOf(requestName) < 0) {
          this.nodeTypesToRequests[nodeType].push(requestName);
        }
      }
    }
  }

  setData(name: string, data: DmDataObject) {
    if (!this.data.hasOwnProperty(name)) {
      this.data[name] = new BehaviorSubject<DmDataObject | null>(null);
    }
    this.data[name].next(data);
  }

  listenForEdits() {
    this.dmWebsocket.modificationMade.subscribe((message: any) => {
      if (!message) {
        return;
      }
      const nodeType: string = message.modified
      if (nodeType && nodeType !== '') {
        if (this.nodeTypesToRequests[nodeType]) {
          for (const requestName of this.nodeTypesToRequests[nodeType]) {
            if (this.uidRequests[requestName] &&
              message.item &&
              this.uidRequests[requestName] === message.item[0]?.uid) {
              const resultDataObj: DmDataObject = {
                data: message.item
              }
              // we can just set the uid request directly with the modified data. No need for another fetch call
              this.setData(requestName, resultDataObj);
              continue;
            }

            // this is more expensive – refresh a whole table request.
            this.dmWebsocket.refreshRequest(requestName);
          }
        }
      }
    })
  }
}
