import { DmWebSocketServer } from "./src/websocket/DmWebsocketServer.js";
import { DmDgraphClient } from "./src/database/DmDgraphClient.js";
import { DmDatabaseClient } from "./src/database/DmDatabaseClient";
import * as util from 'util';
import { dungeoneerSchema } from 'dungeoneer-common';

/**
 * 
 * a not on imports and something annoying
 * 
 * Using type: "module" and ESNext, it seems I have to specify the .js extension for imported classes and whatnot,
 * but if I have a file with just typescript interfaces (like DmDatabaseClient for example) I have to omit the .js extension.
 * 
 */

console.log('SCHEMA IS', dungeoneerSchema);
const websocketServer: DmWebSocketServer = new DmWebSocketServer(1759);
export const dbc: DmDatabaseClient = new DmDgraphClient(dungeoneerSchema);

export function fullLog(obj: any): string {
    return util.inspect(obj, {showHidden: false, depth: null});
}