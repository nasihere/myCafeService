"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
const config = {
    aws_table_name: 'mycafe-users',
    aws_table_name2: '',
    aws_table_name3: '',
    aws_local_config: {},
    aws_remote_config: config_1.myAwsConfig
};
const v1_1 = __importDefault(require("uuid/v1"));
class DB_Users {
    constructor() {
        this.addUsers = (req) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            Item.id = v1_1.default();
            Item.emailVerified = false;
            Item.createdAt = new Date().toISOString();
            var params = {
                TableName: config.aws_table_name,
                Item: Item
            };
            docClient.put(params, function (err, data) {
            });
        };
        this.getSettings = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    username: req.username
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
                    if (data.Item) {
                        data.Item.username = null;
                        data.Item.password = null;
                        data.Item.email = null;
                        data.Item.cellPhone = null;
                        data.Item.cellphone = null;
                        data.Item.id = null;
                    }
                    res.status(200).send({
                        success: true,
                        message: 'get getSettings',
                        data
                    }).end();
                }
            });
        };
        this.getUsers = (append, req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    username: req.username
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
                        message: 'get user',
                        data,
                        append
                    }).end();
                }
            });
        };
        this.emailVerified = (req) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    username: req.body.username
                },
                UpdateExpression: `set emailVerified = :emailVerified`,
                ExpressionAttributeValues: {
                    ":emailVerified": true
                },
            };
            docClient.update(params, function (err, data) {
            });
        };
        this.updateUser = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    username: req.username
                },
                UpdateExpression: `set cafeName = :cafeName,
            cafeAddress = :cafeAddress,
            cellphone = :cellphone,
            product1 = :product1,
            product2 = :product2,
            product3 = :product3,
            product4 = :product4,
            product5 = :product5,
product6 = :product6,
product7 = :product7,
product8 = :product8,
product9 = :product9,
desc1 = :desc1,
desc2 = :desc2,
desc3 = :desc3,
desc4 = :desc4,
desc5 = :desc5,
desc6 = :desc6,
desc7 = :desc7,
desc8 = :desc8,
desc9 = :desc9,
perCost1 = :perCost1,
perCost2 = :perCost2,
perCost3 = :perCost3,
perCost4 = :perCost4,
perCost5 = :perCost5,
perCost6 = :perCost6,
perCost7 = :perCost7,
perCost8 = :perCost8,
perCost9 = :perCost9`,
                ExpressionAttributeValues: {
                    ":cafeName": req.cafeName,
                    ":cafeAddress": req.cafeAddress,
                    ":cellphone": req.cellphone,
                    ":product1": req.product1,
                    ":product2": req.product2,
                    ":product3": req.product3,
                    ":product4": req.product4,
                    ":product5": req.product5,
                    ":product6": req.product6,
                    ":product7": req.product7,
                    ":product8": req.product8,
                    ":product9": req.product9,
                    ":desc1": req.desc1,
                    ":desc2": req.desc2,
                    ":desc3": req.desc3,
                    ":desc4": req.desc4,
                    ":desc5": req.desc5,
                    ":desc6": req.desc6,
                    ":desc7": req.desc7,
                    ":desc8": req.desc8,
                    ":desc9": req.desc9,
                    ":perCost1": req.perCost1,
                    ":perCost2": req.perCost2,
                    ":perCost3": req.perCost3,
                    ":perCost4": req.perCost4,
                    ":perCost5": req.perCost5,
                    ":perCost6": req.perCost6,
                    ":perCost7": req.perCost7,
                    ":perCost8": req.perCost8,
                    ":perCost9": req.perCost9
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
                        message: 'update user',
                        data,
                        req
                    }).end();
                }
            });
        };
    }
}
exports.default = DB_Users;
//# sourceMappingURL=user.service.js.map