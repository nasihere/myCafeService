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
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const customer_service_1 = __importDefault(require("../services/customer.service"));
const path = require('path');
const PATH = './uploads';
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
let upload = multer({
    storage: storage
});
class CustomerController {
    constructor() {
        this.path = '/customer';
        this.router = express.Router();
        this.create = (req, res) => {
            new customer_service_1.default().addCustomer(req.body, res);
        };
        this.delete = (req, res) => {
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            const { id } = req.body;
            let userAttr = { id };
            new customer_service_1.default().deleteCustomer(userAttr, res);
        };
        this.findBillingId = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new customer_service_1.default().getBillingId(userAttr, res);
        };
        this.findCustomerById = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new customer_service_1.default().getCustomerById(userAttr, res);
        };
        this.findByCellPhone = (req, res) => {
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            let userAttr = Object.assign({}, req.body);
            new customer_service_1.default().getCustomerByCellPhone(userAttr, res);
        };
        this.findBySearch = (req, res) => {
            let userAttr = Object.assign({}, req.body);
            new customer_service_1.default().getCustomerBySearchText(userAttr, res);
        };
        this.upload = (req, res) => {
            const result = express_validator_1.validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
            const { custid, description, filenumber = '1234' } = req.body;
            let userAttr = { custid, description, filenumber };
            new customer_service_1.default().uploadDocument(userAttr, res);
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/create', upload.single('image'), this.create);
        this.router.post('/delete', this.validateBody('delete'), this.delete);
        this.router.post('/findByCellPhone', this.validateBody('findByCellPhone'), this.findByCellPhone);
        this.router.post('/upload', this.validateBody('upload'), this.upload);
        this.router.post('/findBySearchText', [], this.findBySearch);
        this.router.post('/findCustomerById', [], this.findCustomerById);
        this.router.post('/findBillingId', [], this.findBillingId);
    }
    validateBody(type) {
        switch (type) {
            case 'create':
                return [
                    express_validator_1.body('username').notEmpty().isLength({ min: 1 }),
                    express_validator_1.body('firstname').not().isEmpty().withMessage('First name is required'),
                    express_validator_1.body('lastname').not().isEmpty().withMessage('Last name is required'),
                    express_validator_1.body('address').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
                    express_validator_1.body('tel').isInt(),
                    express_validator_1.body('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email'),
                    express_validator_1.body('gender').not().isEmpty().withMessage('Gender is required').isIn(['M', 'F']),
                    express_validator_1.body('dob').isString().optional({ checkFalsy: true }),
                ];
            case 'delete':
                return [
                    express_validator_1.body('id').notEmpty().isLength({ min: 1 }),
                ];
            case 'findByCellPhone':
                return [
                    express_validator_1.body('cellphone').optional({ checkFalsy: true }).isString().isLength({ min: 10 }),
                    express_validator_1.body('username').notEmpty().isLength({ min: 1 })
                ];
            case 'upload':
                return [
                    express_validator_1.body('custid').isString().isLength({ min: 1 }),
                    express_validator_1.body('description').isString().isLength({ min: 1 }),
                    express_validator_1.body('filenumber').isString().isLength({ min: 1 })
                ];
        }
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map