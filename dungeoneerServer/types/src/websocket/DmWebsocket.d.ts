import Websocket from 'ws';
export declare class DmWebSocket extends Websocket {
    isAlive: boolean;
    constructor(url: string, protocols?: string | string[]);
}
