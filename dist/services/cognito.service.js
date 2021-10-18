"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
class Cognito {
    constructor() {
        this.config = {
            apiVersion: '2016-04-18',
            region: config_1.region
        };
        this.clientId = config_1.cognito.clientId;
        this.secretHash = config_1.cognito.secretHash;
        this.cognitoIdentity = new aws_sdk_1.default.CognitoIdentityServiceProvider(this.config);
    }
    signUpUser(username, password, userAttr) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                ClientId: this.clientId,
                Password: password,
                Username: username,
                SecretHash: this.hashSecret(username),
                UserAttributes: userAttr,
            };
            try {
                const data = yield this.cognitoIdentity.signUp(params).promise();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    signInUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.clientId,
                AuthParameters: {
                    'USERNAME': username,
                    'PASSWORD': password,
                    'SECRET_HASH': this.hashSecret(username)
                },
            };
            try {
                let data = yield this.cognitoIdentity.initiateAuth(params).promise();
                return data;
            }
            catch (error) {
                return false;
            }
        });
    }
    confirmSignUp(username, code) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                ClientId: this.clientId,
                ConfirmationCode: code,
                Username: username,
                SecretHash: this.hashSecret(username),
            };
            try {
                const cognitoResp = yield this.cognitoIdentity.confirmSignUp(params).promise();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    getUser(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                AccessToken: authorization
            };
            try {
                let data = yield this.cognitoIdentity.getUser(params).promise();
                return data;
            }
            catch (error) {
                return false;
            }
        });
    }
    hashSecret(username) {
        return crypto_1.default.createHmac('SHA256', this.secretHash)
            .update(username + this.clientId)
            .digest('base64');
    }
}
exports.default = Cognito;
//# sourceMappingURL=cognito.service.js.map