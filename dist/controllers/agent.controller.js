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
const web_socket_1 = require("../web-socket");
const express = __importStar(require("express"));
const session_service_1 = __importDefault(require("../services/session.service"));
class SessionController {
    constructor() {
        this.path = '/agent';
        this.router = express.Router();
        this.socket = new web_socket_1.Socket().write;
        this.socketHandler = (req, res) => {
            const agentid = req.body.agentid;
            const action = req.body.action;
            const timer = req.body.timer;
            this.socket(JSON.stringify({ agentid, action, timer }));
            res.status(200).send({
                success: true,
            }).end();
        };
        this.create = (req, res) => {
            new session_service_1.default().addAgentPC(req.body, res);
        };
        this.findByPCName = (req, res) => {
            const { pcname, username } = req.body;
            let userAttr = { pcname, username };
            new session_service_1.default().getAgentPCByName(userAttr, res);
        };
        this.getAgentPCs = (req, res) => {
            const { username } = req.body;
            let userAttr = { username };
            new session_service_1.default().getAgentPCs(userAttr, res);
        };
        this.onlineAgent = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().onlineAgent(userAttr, res);
        };
        this.findAgentDetail = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().findAgentDetails(userAttr, res);
        };
        this.billingMisc = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().billingStart(userAttr, res, this.socket);
        };
        this.bookAgent = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            if (userAttr.pcstatus == 'busy') {
                new session_service_1.default().billingStart(userAttr, res);
            }
            else if (userAttr.pcstatus == 'finished') {
                new session_service_1.default().billingEnd(userAttr, res);
            }
            else {
                new session_service_1.default().bookAgent(userAttr, res);
            }
        };
        this.unlockAgent = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().unlockAgent(userAttr, res);
        };
        this.billpaid = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().billpaid(userAttr, res);
        };
        this.billingSessions = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new session_service_1.default().billingSessions(userAttr, res);
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/create', [], this.create);
        this.router.post('/findByPCName', [], this.findByPCName);
        this.router.post('/findAllPcs', [], this.getAgentPCs);
        this.router.post('/onlineAgent', [], this.onlineAgent);
        this.router.post('/findAgentDetail', [], this.findAgentDetail);
        this.router.post('/bookAgent', [], this.bookAgent);
        this.router.post('/unlockAgent', [], this.unlockAgent);
        this.router.post('/billpaid', [], this.billpaid);
        this.router.post('/billingStart', [], this.billingMisc);
        this.router.post('/billingSessions', [], this.billingSessions);
        this.router.post('/SOCKET/LOCk', [], this.socketHandler);
        this.router.post('/SOCKET/SHOW', [], this.socketHandler);
        this.router.post('/SOCKET/HIDE', [], this.socketHandler);
        this.router.post('/SOCKET/CLEAR_HISTORY', [], this.socketHandler);
        this.router.post('/SOCKET/SHUTDOWN_PC', [], this.socketHandler);
        this.router.post('/SOCKET/AGENT_CLOSED', [], this.socketHandler);
    }
}
exports.default = SessionController;
//# sourceMappingURL=agent.controller.js.map