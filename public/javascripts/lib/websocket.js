
class Socket {
    constructor(ws) {
        this.ws = ws;
        this.eventHandlers = {};
        this.emitQueue = [];

        this.ws.onmessage = (message) => {
            message = JSON.parse(message.data);
            let {channel, msg, data} = message;
            let cb = this.eventHandlers[channel];

            if (!cb) return;
            cb(msg, data);
        }

        // send cached messages which are trying to send
        // when socket is connecting.
        this.ws.onopen = () => {
            this.emitQueue.forEach((msg) => {
                this.ws.send(JSON.stringify(msg));
            });
        }
    }

    // bind an event handler for specific channel.
    on(channel, cb) {
        this.eventHandlers[channel] = cb;
    }

    emit(channel, data={}) {
        let msg = {channel, data};

        // if socket is connecting, then cache the message.
        if (this.ws.readyState == this.ws.CONNECTING) {
            this.emitQueue.push(msg);
        } else {
            this.ws.send(JSON.stringify(msg));
        }
    }
}

let protocol = window.location.protocol == 'https:' ? 'wss' : 'ws';
let ws = new WebSocket(`${protocol}://${window.location.hostname}:8443`);
let socket = new Socket(ws);

module.exports = socket;
