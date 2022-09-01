import { DmRequest } from "dungeoneer-common";
import { DmWebSocket } from "./DmWebsocket.js";
import { DmWebSocketServer } from "./DmWebsocketServer.js";
export declare function handleRequest(request: DmRequest, dmws: DmWebSocket, server: DmWebSocketServer): Promise<void>;
export declare function sendErrorMessage(dmws: DmWebSocket, code: number, message: string, id?: string, data?: any): void;
export declare function broadcastEditedItem(dmws: DmWebSocket, server: DmWebSocketServer, nodeType: string, uid: string): Promise<void>;
