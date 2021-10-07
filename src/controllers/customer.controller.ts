import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';

class CustomerController {
    public path = '/customer'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/create', this.validateBody('create'), this.create)
        this.router.post('/delete', this.validateBody('delete'), this.delete)
        this.router.post('/view', this.validateBody('view'), this.view)

      }


    // create new customer
    create = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { firstname, lastname, address, tel, gender, email, dob } = req.body;
      let userAttr = [];
      userAttr.push({ Name: 'email', Value: email});
      userAttr.push({ Name: 'gender', Value: gender});
      userAttr.push({ Name: 'dob', Value: dob.toString()});
      userAttr.push({ Name: 'firstname', Value: firstname});
      userAttr.push({ Name: 'lastname', Value: lastname});
      userAttr.push({ Name: 'address', Value: address});
      userAttr.push({ Name: 'tel', Value: tel});
      userAttr.push({ Name: 'tel', Value: tel});

      console.log('create request payload', userAttr);

    }


    // delete new customer
    delete = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { id } = req.body;
      let userAttr = [];
      userAttr.push({ Name: 'id', Value: id});

      console.log('delete request payload', userAttr);

    }

    // view new customer
    view = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { id,firstname, lastname,  tel, gender, email } = req.body;
      let userAttr = [];
      userAttr.push({ Name: 'id', Value: id});

      userAttr.push({ Name: 'email', Value: email});
      userAttr.push({ Name: 'gender', Value: gender});
      userAttr.push({ Name: 'firstname', Value: firstname});
      userAttr.push({ Name: 'lastname', Value: lastname});
      userAttr.push({ Name: 'tel', Value: tel});

      console.log('delete request payload', userAttr);

    }

    private validateBody(type: string) {
      switch (type) {
        case 'create':
          return [
            body('firstname').not().isEmpty().withMessage('First name is required'),
            body('lastname').not().isEmpty().withMessage('Last name is required'),
            body('address').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
            body('tel').isInt(),
            body('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email'),
            body('gender').not().isEmpty().withMessage('Gender is required').isIn(['M', 'F']),
            body('dob').toDate().optional({ checkFalsy: true }),
          ]
        case 'delete':
          return [
            body('id').notEmpty().isLength({min: 1}),
            
          ]
        case 'view':
          return [
            body('id').isString().isLength({min: 1})
          ]
      }
    }
}

export default CustomerController