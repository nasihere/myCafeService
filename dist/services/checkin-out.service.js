"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const config = {
    aws_table_name: 'mycafe-session',
    aws_table_name2: 'mycafe-billing',
    aws_table_name3: '',
    aws_local_config: {},
    aws_remote_config: config_1.myAwsConfig
};
class DB_CHECKIN_OUT {
    constructor() {
        this.selfCheckIn = (req, res) => {
        };
    }
}
exports.default = DB_CHECKIN_OUT;
//# sourceMappingURL=checkin-out.service.js.map