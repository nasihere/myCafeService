import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';
import DB_Customer from '../services/customer.service';
var AWS = require('aws-sdk');

class CheckInOutController {
    public path = '/check'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/SMS-OPT', this.validateBody('sms'), this.smsOpt)
        this.router.post('/out', this.validateBody('out'), this.checkout)
        

      }


    // checkin  customer
    smsOpt = (req: Request, res: Response) => {
        
      AWS.config.update({region: 'REGION'});

      // Create publish parameters
      var params = {
        Message: `SMS OPT FOR ACCESSING CYBER CAFE IS ${req['accessCode'] || '6633'}`, /* required */
        PhoneNumber: req['cellphone'] //'E.164_PHONE_NUMBER', +1001 XXX5550100.
      };
      
      // Create promise and SNS service object
      var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
      
      // Handle promise's fulfilled/rejected states
      publishTextPromise.then(
        function(data) {
          console.log("MessageID is " + data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });


    }


   // checkout  customer
   checkout = (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body)
    
    const { id } = req.body;
    let userAttr =  { id };
    
    console.log('checkout  customer', userAttr);
    new DB_Customer().checkout(userAttr, res);
    
  }


    private validateBody(type: string) {
      switch (type) {
       
        case 'sms':
          return [
            body('cellphone').notEmpty().isLength({min: 10, max: 10})
            
          ]
        case 'out':
          return [
            body('id').notEmpty().isLength({min: 1}),
            
            
          ]
      }
    }
}

export default CheckInOutController