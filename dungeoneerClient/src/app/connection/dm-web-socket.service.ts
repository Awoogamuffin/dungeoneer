import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { DmRequest, DmResponse } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
import { environment } from 'src/environments/environment';
import { nanoid } from 'nanoid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmWebSocketService {

  // store callbacks to be called once response is received. the key is the id of the request message sent
  private callbacks: { [key: string]: Function } = {};

  // store named requests that my be repeated (when underlying data has been modified)
  private requests: { [key: string]: DmRequest } = {};

  // store the callbacks for name requests
  private requestCallbacks: any = {};

  // keep track of requests sent to server that are awaiting the "messageReceived" signal
  private unacknowledgeRequests: any = {};

  socket!: WebSocketSubject<DmRequest | DmResponse>;

  connected = new BehaviorSubject<boolean>(false);
  modificationMade: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.connectWebsocket();
  }

  onMessage = (value: DmResponse | DmRequest) => {

    // not using checks here because really we should only receive DmResponses, but I have to force the issue here
    const message: DmResponse = value as DmResponse;

    if (message.id) {
      if (message.data && message.data.messageReceived) {
        // in the future we could record how long it took the server to send the receipt message,
        // or think of what to do if it's taking too long. This is not the response to the request, but
        // simply the server saying "I got your message. You'll get my response eventually, perhaps"
        console.log(`received signal sent in ${new Date().getTime() - this.unacknowledgeRequests[message.id]} ms`);
        delete this.unacknowledgeRequests[message.id];

        return;
      }

      // if message has an id it means it's a response to a request made by this client
      if (this.callbacks[message.id]) {

        if (message.error) {
          // eventaully might do something more useful here... in theory the callback should handle the error itself
          console.log('RECEIVED MESSAGE ERROR', message.error);
        }

        // send response to callback. The message could be an error message – the callback function is expected to handle it.
        this.callbacks[message.id](message);

        // remove callback unless this is not the final response
        if (!message.data?.notFinal) {
          delete this.callbacks[message.id];
        }
      }
    }

    // the server will send "modified" responses when somebody performs an add / edit. The datastore will respond to this
    if (message.result && message.result.modified) {
      this.modificationMade.next(message.result);
    }
  }

  onError = (error: any) => {

    console.warn('on socket erorr!', error);
    if (this.socket) {
      this.socket.complete();
      this.socket.unsubscribe();
    }
    // try to reconnect in a second
    setTimeout(() => {
      this.connectWebsocket();
    }, 1000);
    
  }

  connectWebsocket() {
    const host = window.location.hostname;
    console.log('connecting to websocket', `ws://${host}:1759`);
    this.socket = new WebSocketSubject({url: `ws://${host}:1759`, openObserver: {
        next: () => {
          console.log('ws connected');
          this.connected.next(true);
        }
      }
    });
    this.socket.subscribe(this.onMessage, this.onError, this.onFinished);
  }

  onFinished() {
    console.log('socket finished');
  }

  // following json-rpc conventions, a "request" expects a response (so needs an id) as opposed to a notification.
  // supply a unique name to this function so that it may be refreshed later if needed.
  sendRequest(request: DmRequest, callback?: Function, requestName?: string) {

    // I've decided that all requests will get an immediate response from the server to acknowledge receipt of request, regardless of there being
    // a callback or not
    request.id = this.getID();

    if (callback) {
      this.callbacks[request.id] = callback;
    }

    if (requestName) {
      this.requests[requestName] = request;
      if (callback) {
        this.requestCallbacks[requestName] = callback;
      }
    }

    this.sendMessage(request);
  }

  // for named requests (that might get refreshed) you can remove their request and callback data here
  public removeRequest(requestName: string) {
    delete this.requests[requestName];
    delete this.requestCallbacks[requestName];
  }

  // repeat an existing request (maybe because the associated data has changed)
  refreshRequest(requestName: string, callback?: Function) {
    if (!this.requests[requestName]) {
      throw new Error('no request to refresh: ' + requestName);
    }

    const request: DmRequest = this.requests[requestName];

    // if no callback has been explicitly provided, check the requestcallbacks for a function.
    if (!callback) {
      callback = this.requestCallbacks[requestName];
    }

    request.id = this.getID();

    if (callback) {
      this.callbacks[request.id] = callback;
    }
    
    this.sendMessage(request);
  }

  private sendMessage(request: DmRequest) {
    if (this.socket) {
      // store time of request sent and wait for the "messageReceived" signal from server
      if (request.id) {
        this.unacknowledgeRequests[request.id] = new Date().getTime();
      }

      // finally send the request!
      this.socket.next(request);
    } else {
      throw new Error("No socket to send message")
    }
  }

  getID(): string {
    let id: string = nanoid()

    // the chances of a collision are vanishingly small, but it's still cheap to make sure
    while(this.callbacks[id]) {
      id = nanoid();
    }

    return id;
  }
}
