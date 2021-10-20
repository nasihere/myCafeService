"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
const config = {
    aws_table_name: 'mycafe-session',
    aws_table_name2: 'mycafe-billing',
    aws_table_name3: '',
    aws_local_config: {},
    aws_remote_config: config_1.myAwsConfig
};
const v1_1 = __importDefault(require("uuid/v1"));
class DB_Session {
    constructor() {
        this.addAgentPC = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            Item.id = v1_1.default();
            Item.pcname = req.pcname;
            Item.createdAt = new Date().toISOString();
            Item.username = req.username;
            Item.lastResponseAt = null;
            var params = {
                TableName: config.aws_table_name,
                Item: Item
            };
            docClient.put(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: 'get agent pc details',
                        data: Object.assign(Object.assign({}, params), { Count: 1 }),
                        id: Item.id,
                    });
                }
            });
        };
        this.getAgentPCByName = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                FilterExpression: 'username = :username AND pcname = :pcname',
                ExpressionAttributeValues: {
                    ":username": Item.username,
                    ":pcname": Item.pcname
                }
            };
            docClient.scan(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: 'get agent pc details',
                        data
                    });
                }
            });
        };
        this.getAgentPCs = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                FilterExpression: 'username = :username ',
                ExpressionAttributeValues: {
                    ":username": Item.username,
                }
            };
            docClient.scan(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: 'get all agent pc details',
                        data
                    });
                }
            });
        };
        this.onlineAgent = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.id
                },
                UpdateExpression: `set agentOnline = :agentOnline, lastResponseAt = :lastResponseAt`,
                ExpressionAttributeValues: {
                    ":agentOnline": req.online,
                    ":lastResponseAt": new Date().toISOString()
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'update agent',
                        data,
                        req
                    }).end();
                }
            });
        };
        this.findAgentDetails = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'get agent machine ',
                        data
                    }).end();
                }
            });
        };
        this.bookAgent = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.id
                },
                UpdateExpression: `set accessCode = :accessCode,
            accessAt = :accessAt,
            timer = :timer,
            pcstatus = :pcstatus,
            customerId = :customerId,
            billingId = :billingId,
            selfCheckin = :selfCheckin`,
                ExpressionAttributeValues: {
                    ":accessCode": req.accessCode,
                    ":accessAt": req.accessAt,
                    ":timer": req.timer,
                    ":pcstatus": req.pcstatus,
                    ":customerId": req.customerId,
                    ":billingId": req.billingId || null,
                    ":selfCheckin": req.selfCheckin || false
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'bookAgent ',
                        data,
                        req
                    }).end();
                }
            });
        };
        this.updateBillingEnd = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.agentid
                },
                UpdateExpression: `set  pcstatus = :pcstatus, accessCode = :accessCode, timer = :timer, lastResponseAt = :lastResponseAt, accessAt = :accessAt, customerId = :customerId`,
                ExpressionAttributeValues: {
                    ":pcstatus": req.pcstatus,
                    ":accessCode": null,
                    ":timer": null,
                    ":lastResponseAt": new Date().toISOString(),
                    ":accessAt": null,
                    ":customerId": null
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'bookAgent ',
                        data,
                        req
                    }).end();
                }
            });
        };
        this.updateBillPaid = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.agentid
                },
                UpdateExpression: `set  pcstatus = :pcstatus, customerId = :customerId`,
                ExpressionAttributeValues: {
                    ":pcstatus": req.pcstatus,
                    ":customerId": null
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'updateBillPaid ',
                        data,
                        req
                    }).end();
                }
            });
        };
        this.updateBillingId = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.agentid
                },
                UpdateExpression: `set billingId = :billingId, pcstatus = :pcstatus`,
                ExpressionAttributeValues: {
                    ":billingId": req.billingId || null,
                    ":pcstatus": req.pcstatus
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'bookAgent ',
                        data,
                        req
                    }).end();
                }
            });
        };
        this.unlockAgent = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                FilterExpression: 'id = :id AND accessCode = :accessCode',
                ExpressionAttributeValues: {
                    ":id": Item.id,
                    ":accessCode": Number(Item.accessCode)
                }
            };
            docClient.scan(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: 'get agent accessCode details',
                        data
                    });
                }
            });
        };
        this.billingStart = (req, res, socket) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            let Item = {
                id: v1_1.default(),
                billDt: new Date().toISOString(),
                agentid: req.agentid,
                customerid: req.customerid,
                customerName: req.customerName || null,
                username: req.username,
                checkIn: new Date().toISOString(),
                checkout: req.agentid == 'PC-MISC' ? new Date().toISOString() : null,
                timer: req.timer,
                billPaid: req.billPaid || false,
                selfCheckIn: req.selfCheckin || false
            };
            if (Item.checkout == null) {
                this.checkCheckOut(socket, Item.checkout, Item.agentid, req.timer, 'SETLOGOFF');
            }
            else {
                this.checkCheckOut(socket, Item.checkout, Item.agentid, req.timer, 'LOCK');
            }
            var params = {
                TableName: config.aws_table_name2,
                Item: Item
            };
            docClient.put(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    req.billingId = Item.id;
                    if (req.agentid == 'PC-MISC') {
                        res.status(200).send({
                            success: true,
                            message: 'PC-MISC',
                            billingId: req.billingId
                        }).end();
                        return;
                    }
                    req.agentid = Item.agentid;
                    this.updateBillingId(req, res);
                }
            });
        };
        this.billingEnd = (req, res, socket) => {
            if (!req.billingId)
                return;
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            let Item = req;
            Item.checkout = new Date().toISOString();
            this.checkCheckOut(socket, Item.checkout, Item.agentid, 1, 'LOCK');
            var params = {
                TableName: config.aws_table_name2,
                Key: {
                    id: req.billingId,
                },
                UpdateExpression: `set checkout = :checkout, customerName = :customerName`,
                ExpressionAttributeValues: {
                    ":checkout": new Date().toISOString(),
                    ":customerName": req.customerName || null
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    req.billingId = Item.id;
                    req.agentid = Item.agentid;
                    this.updateBillingEnd(req, res);
                }
            });
        };
        this.billpaid = (req, res) => {
            if (!req.billingId)
                return;
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name2,
                Key: {
                    id: req.billingId,
                },
                UpdateExpression: `set billPaid = :billPaid, 
            billTotal = :billTotal,
            productCode1 = :productCode1,
            productQty1 = :productQty1,
            productCost1 = :productCost1,
            productCode2 = :productCode2,
            productQty2 = :productQty2,
            productCost2 = :productCost2,
            productCode3 = :productCode3,
            productQty3 = :productQty3,
            productCost3 = :productCost3,
            productCode4 = :productCode4,
            productQty4 = :productQty4,
            productCost4 = :productCost4,
            productCode5 = :productCode5,
            productQty5 = :productQty5,
            productCost5 = :productCost5,
            productCode6 = :productCode6,
            productQty6 = :productQty6,
            productCost6 = :productCost6,
            productCode7 = :productCode7,
            productQty7 = :productQty7,
            productCost7 = :productCost7,
            productCode8 = :productCode8,
            productQty8 = :productQty8,
            productCost8 = :productCost8,
            productCode9 = :productCode9,
            productQty9 = :productQty9,
            productCost9 = :productCost9
            `,
                ExpressionAttributeValues: {
                    ":billTotal": req.billTotal,
                    ":productCode1": req.productCode1,
                    ":productQty1": req.productQty1,
                    ":productCost1": req.productCost1,
                    ":productCode2": req.productCode2,
                    ":productQty2": req.productQty2,
                    ":productCost2": req.productCost2,
                    ":productCode3": req.productCode3,
                    ":productQty3": req.productQty3,
                    ":productCost3": req.productCost3,
                    ":productCode4": req.productCode4,
                    ":productQty4": req.productQty4,
                    ":productCost4": req.productCost4,
                    ":productCode5": req.productCode5,
                    ":productQty5": req.productQty5,
                    ":productCost5": req.productCost5,
                    ":productCode6": req.productCode6,
                    ":productQty6": req.productQty6,
                    ":productCost6": req.productCost6,
                    ":productCode7": req.productCode7,
                    ":productQty7": req.productQty7,
                    ":productCost7": req.productCost7,
                    ":productCode8": req.productCode8,
                    ":productQty8": req.productQty8,
                    ":productCost8": req.productCost8,
                    ":productCode9": req.productCode9,
                    ":productQty9": req.productQty9,
                    ":productCost9": req.productCost9,
                    ":billPaid": true
                },
            };
            docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    req.id = req.agentid;
                    req.pcstatus = 'ready';
                    this.updateBillPaid(req, res);
                }
            });
        };
        this.billingSessions = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            let Item = req;
            var params = {
                TableName: config.aws_table_name2,
                FilterExpression: 'username = :username',
                ExpressionAttributeValues: {
                    ":username": Item.username
                },
                Limit: Item.pageLimit || 30,
                ScanIndexForward: false
            };
            docClient.scan(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'billingSessions ',
                        data
                    }).end();
                }
            });
        };
    }
    checkCheckOut(socket, checkoutVal, agentid, timer, action) {
        if (checkoutVal) {
            socket(JSON.stringify({ agentid, action: 'LOCK', timer }));
        }
    }
}
exports.default = DB_Session;
//# sourceMappingURL=session.service.js.map