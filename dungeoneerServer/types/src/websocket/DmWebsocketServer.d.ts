import { WebSocketServer } from 'ws';
import { DmResponse } from 'dungeoneer-common/dist/types/src/connection/connectionTypes';
export declare class DmWebSocketServer {
    private port;
    wsServer: WebSocketServer;
    constructor(port: number);
    broadcast(message: DmResponse): void;
}
