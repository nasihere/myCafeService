"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
const config = {
    aws_table_name: 'mycafe-customer',
    aws_table_name2: 'mycafe-customer-doc',
    aws_table_name3: 'mycafe-check-in-out',
    aws_table_name4: 'mycafe-billing',
    aws_local_config: {},
    aws_remote_config: config_1.myAwsConfig
};
const v1_1 = __importDefault(require("uuid/v1"));
class DB_Customer {
    constructor() {
        this.addCustomer = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            Item.id = v1_1.default();
            Item.createdAt = new Date().toISOString();
            Item.searchText = JSON.stringify(Item).toString().toLowerCase();
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
                        message: 'Added customer',
                        data,
                        req: req.body,
                        id: Item.id
                    });
                }
            });
        };
        this.deleteCustomer = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.id
                }
            };
            docClient.delete(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err
                    });
                }
                else {
                    res.send({
                        success: true,
                        message: 'Deleted Item',
                        data
                    });
                }
            });
        };
        this.getBillingId = (req, res) => {
            if (!req.id)
                return;
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            var params = {
                TableName: config.aws_table_name4,
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
                        message: ' getBillingId ',
                        data
                    }).end();
                }
            });
        };
        this.getCustomerById = (req, res) => {
            if (!req.id) {
                res.status(400).send({
                    success: false,
                    message: 'customer id is null'
                }).end();
                return;
            }
            ;
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
                        message: 'get getCustomerById machine ',
                        data
                    }).end();
                }
            });
        };
        this.getCustomerByCellPhone = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                FilterExpression: 'cellphone = :cellphone AND username = :username',
                ExpressionAttributeValues: {
                    ":cellphone": Item.cellphone,
                    ":username": Item.username
                }
            };
            docClient.scan(params, function (err, data) {
                if (err) {
                    res.send({
                        success: false,
                        message: err,
                        customerNotFound: true
                    });
                }
                else {
                    if (!data.Count) {
                        res.send({
                            success: false,
                            message: err,
                            otpVerification: false,
                            customerNotFound: true
                        });
                        return;
                    }
                    res.send({
                        success: true,
                        message: 'get Item',
                        data,
                        customerNotFound: false
                    });
                }
            });
        };
        this.uploadDocument = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            Item.id = v1_1.default();
            var params = {
                TableName: config.aws_table_name2,
                Item: {
                    id: Item.id,
                    desciption: req.description,
                    custid: req.custid,
                    filenumber: req.filenumber
                }
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
                        message: 'get uploaded document',
                        data,
                        id: Item.id
                    });
                }
            });
        };
        this.checkin = (req, res) => {
        };
        this.checkout = (req, res) => {
        };
        this.getCustomerBySearchText = (req, res) => {
            aws_sdk_1.default.config.update(config.aws_remote_config);
            const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
            const Item = req;
            var params = {
                TableName: config.aws_table_name,
                FilterExpression: 'contains (searchText, :searchText) and username = :username',
                ExpressionAttributeValues: {
                    ":searchText": Item.searchText.toString().toLowerCase(),
                    ":username": Item.username
                },
                Limit: Item.pageLimit || 30,
                ScanIndexForward: false
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
                        message: 'get Item',
                        data
                    });
                }
            });
        };
    }
}
exports.default = DB_Customer;
//# sourceMappingURL=customer.service.js.map