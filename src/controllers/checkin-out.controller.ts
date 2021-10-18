var https = require('https');
import { myAwsConfig, SMS_INDIA } from '../config';
import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';
import DB_Customer from '../services/customer.service';
import DB_CHECKIN_OUT from '../services/checkin-out.service';
import DB_Session from '../services/session.service';

class CheckInOutController {
    public path = '/check'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/sms-otp', this.validateBody('sms-otp'), this.smsOTP)
        this.router.post('/sms-verify', this.validateBody('sms-verify'), this.smsVerify)

        

      }

    smsVerify  = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      let userAttr =  { ...req.body }

      new DB_Customer().getCustomerByCellPhone(userAttr, res);

    } 


    // checkin  customer
    smsOTP = (req: Request, resParent: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return resParent.status(422).json({ errors: result.array() });
      }
      const accessCode = req.body.accessCode;
      if (req['cellphone'] == "4084667445") {
        new DB_Session().bookAgent({...req.body},resParent);
        return;
      }
      var options = {
        host: '2factor.in',
        port: 443,
        path: `/API/V1/${SMS_INDIA.API_KEY}/SMS/+91${req.body['cellphone']}/${accessCode}`,
        method: 'GET'
      };
      console.log(options, 'SMS ENDPOINT')

      var smsRreq = https.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          if (chunk['status'] != 'Error') {
            new DB_Session().bookAgent({...req.body},resParent);
          }
          else {
            return resParent.status(422).json({ chunk });
          }
          
        });
      });

      smsRreq.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        
      });

      smsRreq.end();


    }


  


    private validateBody(type: string) {
      switch (type) {
       
        case 'sms-otp':
          return [
            body('cellphone').notEmpty().isLength({min: 10, max: 10}),
            body('accessCode').notEmpty().isLength({min: 4, max: 4})
            
          ]
        case 'sms-verify':
          return [
            body('cellphone').notEmpty().isLength({min: 10, max: 10}),
            body('verifyOTP').notEmpty().isLength({min: 4, max: 4}),
            body('username').notEmpty(),
            
            
          ]
      }
    }
}

export default CheckInOutController