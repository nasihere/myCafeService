import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';
import DB_Customer from '../services/customer.service';

class CheckInOutController {
    public path = '/check'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/in', this.validateBody('inout'), this.checkin)
        this.router.post('/out', this.validateBody('out'), this.checkout)
        

      }


    // checkin  customer
    checkin = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      
      const { custid, computerno } = req.body;
      let userAttr =  { custid, computerno };
      
      console.log('checkin  customer', userAttr);
      new DB_Customer().checkin(userAttr, res);
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
       
        case 'inout':
          return [
            body('custid').notEmpty().isLength({min: 1}),
            body('computerno').optional(),
            
          ]
        case 'out':
          return [
            body('id').notEmpty().isLength({min: 1}),
            
            
          ]
      }
    }
}

export default CheckInOutController