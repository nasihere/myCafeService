import App from './app'

import * as bodyParser from 'body-parser'

import AuthController from './controllers/auth.controller'
import CustomerController from './controllers/customer.controller'
import AuthMiddleware from './middleware/auth.middleware'
import CheckInOutController from './controllers/checkin-out.controller'
import fileUpload  from 'express-fileupload';
import SessionController from './controllers/agent.controller'
import { Socket }  from './web-socket'
const socket = new Socket();


const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './'
});
const app = new App({
    port: 5000,
    controllers: [
        new SessionController(socket),
        new AuthController(),   
        new CustomerController(),
        new CheckInOutController()
    ],
    middleWares: [
      
      // parse application/json
      // parse application/x-www-form-urlencoded
      multipartMiddleware,
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      }),
      new AuthMiddleware().verifyToken,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
})

app.listen()
