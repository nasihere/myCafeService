"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const net_1 = __importDefault(require("net"));
class Socket {
    constructor() {
        this.write = null;
        const server = net_1.default.createServer((socket) => {
            socket.on('error', err => {
                console.error('connected socket: ' + err);
            });
            socket.on('data', (data) => {
                console.log(data.toString());
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
}
exports.Socket = Socket;
//# sourceMappingURL=web-socket.js.map