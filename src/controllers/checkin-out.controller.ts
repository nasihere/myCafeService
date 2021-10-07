import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';

class CheckInOutController {
    public path = '/check'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/in', this.validateBody('inout'), this.checkin)
        this.router.post('/out', this.validateBody('inout'), this.checkout)
        

      }


    // checkin  customer
    checkin = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { id, tel, email } = req.body;
      let userAttr = [];
      userAttr.push({ Name: 'id', Value: id});
      userAttr.push({ Name: 'tel', Value: tel});
      userAttr.push({ Name: 'email', Value: email});

      console.log('checkin  customer', userAttr);

    }


   // checkout  customer
   checkout = (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body)
    
    const { id, tel, email } = req.body;
    let userAttr = [];
    userAttr.push({ Name: 'id', Value: id});
    userAttr.push({ Name: 'tel', Value: tel});
    userAttr.push({ Name: 'email', Value: email});

    console.log('checkout  customer', userAttr);

  }


    private validateBody(type: string) {
      switch (type) {
       
        case 'inout':
          return [
            body('id').notEmpty().isLength({min: 1}),
            body('tel').optional({ checkFalsy: true, nullable: true }).isInt(),
            body('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email'),

          ]
       
      }
    }
}

export default CheckInOutController