import Websocket from 'ws';
export class DmWebSocket extends Websocket {

    isAlive = true;

    constructor(url: string, protocols?: string | string[]) {
        super(url, protocols);
    }
}