import { DmResponse } from 'dungeoneer-common';
import { WebSocketServer } from 'ws';
export declare class DmWebSocketServer {
    private port;
    wsServer: WebSocketServer;
    constructor(port: number);
    broadcast(message: DmResponse): void;
}
