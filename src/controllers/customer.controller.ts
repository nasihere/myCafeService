import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';
import DB_Customer from '../services/customer.service';
const  path = require('path');
const PATH = './uploads';
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});


let upload = multer({
  storage: storage
});

class CustomerController {
    public path = '/customer'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/create', upload.single('image'), this.create)
        this.router.post('/delete', this.validateBody('delete'), this.delete)
        this.router.post('/findByCellPhone', this.validateBody('findByCellPhone'), this.findByCellPhone)
        this.router.post('/upload', this.validateBody('upload'), this.upload)
        
        this.router.post('/findBySearchText', [], this.findBySearch)
        this.router.post('/findCustomerById', [], this.findCustomerById)
        
      }


    // create new customer
    create = (req: Request, res: Response) => {
    
      console.log(req.body, 'request body')
      new DB_Customer().addCustomer( req.body, res);
     
    }


    // delete new customer
    delete = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { id } = req.body;
           
      let userAttr =  { id }
      
      new DB_Customer().deleteCustomer(userAttr, res);
     
    }
    findCustomerById = (req: Request, res: Response) => {
     
      console.log(req.body)
      let userAttr =  { ...req.body }
      
      new DB_Customer().getCustomerById(userAttr, res);
     
    }

    // findByCellPhone new customer
    findByCellPhone = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      
      const { cellphone } = req.body;
           
      let userAttr =  { cellphone }
      
      new DB_Customer().getCustomerByCellPhone(userAttr, res);
     
    }

    findBySearch = (req: Request, res: Response) => {
     
      console.log(req.body)
      
           
      let userAttr =  { ...req.body }
      
      new DB_Customer().getCustomerBySearchText(userAttr, res);
     
    } 
    
    // upload new customer
    upload = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      /*
      console.log(req.body)
      //@ts-ignore
      console.log(req.files.foo); 
      //@ts-ignore
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
       //@ts-ignore
      let sampleFile = req.files.sampleFile;
    
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });

*/
      const { custid, description, filenumber='1234' } = req.body;
      let userAttr =  { custid, description, filenumber }
     
      console.log('upload request payload', userAttr);
      new DB_Customer().uploadDocument(userAttr, res);
     
    }

    private validateBody(type: string) {
      switch (type) {
        case 'create':
          return [
            body('username').notEmpty().isLength({min: 1}),
            body('firstname').not().isEmpty().withMessage('First name is required'),
            body('lastname').not().isEmpty().withMessage('Last name is required'),
            body('address').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
            body('tel').isInt(),
            body('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email'),
            body('gender').not().isEmpty().withMessage('Gender is required').isIn(['M', 'F']),
            body('dob').isString().optional({ checkFalsy: true }),
          ]
        case 'delete':
          return [
            body('id').notEmpty().isLength({min: 1}),
            
          ]
        case 'findByCellPhone':
          return [
            body('cellphone').optional({checkFalsy: true}).isString().isLength({min: 10})          ]
        case 'upload':
          return [
            body('custid').isString().isLength({min: 1}),
            body('description').isString().isLength({min: 1}),
            body('filenumber').isString().isLength({min: 1})
          ]
      }
    }
}

export default CustomerController