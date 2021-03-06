"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const net_1 = __importDefault(require("net"));
class Socket {
    constructor() {
        this.socketGlobal = null;
        const server = net_1.default.createServer((socket) => {
            this.socketGlobal = socket;
            socket.on('error', err => {
                console.error('connected socket: ' + err);
            });
            socket.on('data', (data) => {
                if (!data)
                    return;
                try {
                    console.log(data.toString());
                }
                catch (e) { }
            });
        }).on('error', (err) => {
            console.error(err);
        });
        server.listen(9898, () => {
            console.log('opened server on', server.address().port);
        });
    }
    send(obj) {
        this.socketGlobal.write(JSON.stringify(obj));
    }
}
exports.Socket = Socket;
//# sourceMappingURL=web-socket.js.map