"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bodyParser = __importStar(require("body-parser"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const customer_controller_1 = __importDefault(require("./controllers/customer.controller"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const checkin_out_controller_1 = __importDefault(require("./controllers/checkin-out.controller"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const agent_controller_1 = __importDefault(require("./controllers/agent.controller"));
const web_socket_1 = require("./web-socket");
const socket = new web_socket_1.Socket();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './'
});
const app = new app_1.default({
    port: 5000,
    controllers: [
        new agent_controller_1.default(socket),
        new auth_controller_1.default(),
        new customer_controller_1.default(),
        new checkin_out_controller_1.default()
    ],
    middleWares: [
        multipartMiddleware,
        express_fileupload_1.default({
            limits: { fileSize: 50 * 1024 * 1024 },
        }),
        new auth_middleware_1.default().verifyToken,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});
app.listen();
//# sourceMappingURL=server.js.map