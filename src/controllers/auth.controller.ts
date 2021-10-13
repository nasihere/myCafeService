import * as express from 'express'
import { Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator';
import DB_Users from '../services/user.service';
import Cognito from '../services/cognito.service';

class AuthController {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/test', this.test)
        this.router.post('/signup', this.validateBody('signUp'), this.signUp)
        this.router.post('/signin', this.validateBody('signIn'), this.signIn)
        this.router.post('/verify', this.validateBody('verify'), this.verify)
        this.router.post('/user', this.validateBody('user'), this.user)
        this.router.post('/updateuser', [], this.updateUserDetails)
      }


    test = (req: Request, res: Response) => {
      res.status(200).end('hello world') 
    }
    // Signup new user
    signUp = (req: Request, res: Response) => {
      console.log('controller', 'singup')
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      const { username, password, email, gender, birthdate, name, family_name, country } = req.body;
      let userAttr = [];
      userAttr.push({ Name: 'email', Value: email});
      userAttr.push({ Name: 'gender', Value: gender});
      userAttr.push({ Name: 'birthdate', Value: birthdate.toString()});
      userAttr.push({ Name: 'name', Value: name});
      userAttr.push({ Name: 'family_name', Value: family_name});


      let cognitoService = new Cognito();
      cognitoService.signUpUser(username, password, userAttr)
        .then(success => {
          if (success) {
            new DB_Users().addUsers({
              username,
              email,
              cellPhone: name,
              country,
              password,
              cafeName: family_name
            });
          }
          success ? res.status(200).end() : res.status(400).end()
        })
    }


    // Use username and password to authenticate user
    signIn = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body);
      

      const { username, password } = req.body;
      new DB_Users().getUsers({}, {username}, res);
      return true;
      // let cognitoService = new Cognito();
      // cognitoService.signInUser(username, password)
      //   .then(success => {
      //     if (success) {
      //        new DB_Users().getUsers(success, {username}, res);
      //       //  const data = success;
             
      //     }
      //     else { 
      //        res.status(400).end()
      //     }
      //   })
    }


    // confirm signup account with code sent to email
    verify = (req: Request, res: Response) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body)
      const { username, code } = req.body;

      let cognitoService = new Cognito();
      cognitoService.confirmSignUp(username, code)
        .then(success => {
          if (success) {
            new DB_Users().emailVerified(req);
          }
          success ? res.status(200).end() : res.status(400).end()
        })
    }

    // update user account 
    updateUserDetails = (req: Request, res: Response) => {
      
      console.log(req.body)
      new DB_Users().updateUser(req.body, res);
    }

    user = (req: Request, res: Response) => {
      const result = validationResult(req);
      
      if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
      }
      console.log(req.body);

      const  authorization  = req.header('authorization');
      var params = {
        AccessToken: authorization /* required */
      };
      let cognitoService = new Cognito();
      cognitoService.getUser(authorization)
        .then(success => {
          success ? res.status(200).send(success).end() : res.status(400).end()
        })
    }


    private validateBody(type: string) {
      switch (type) {
        case 'signUp':
          return [
            body('username').notEmpty().isLength({min: 5}),
            body('email').notEmpty().normalizeEmail().isEmail(),
            body('password').isString().isLength({ min: 8}),
            body('birthdate').exists().isISO8601(),
            body('gender').notEmpty().isString(),
            body('name').notEmpty().isString(),
            body('family_name').notEmpty().isString()
          ]
        case 'signIn':
          return [
            body('username').notEmpty().isLength({min: 5}),
            body('password').isString().isLength({ min: 8}),
          ]
        case 'verify':
          return [
            body('username').notEmpty().isLength({min: 5}),
            body('code').notEmpty().isString().isLength({min: 6, max: 6})
          ]
        
        case 'user':
            return [
              header('authorization').isString().isLength({ min: 8}),
            ]
      }
    }
}

export default AuthController