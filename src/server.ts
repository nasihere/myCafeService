import App from './app'

import * as bodyParser from 'body-parser'

import AuthController from './controllers/auth.controller'
import CustomerController from './controllers/customer.controller'
import AuthMiddleware from './middleware/auth.middleware'
import CheckInOutController from './controllers/checkin-out.controller'


const app = new App({
    port: 5000,
    controllers: [
        new AuthController(),   
        new CustomerController(),
        new CheckInOutController()
    ],
    middleWares: [
      // parse application/json
      // parse application/x-www-form-urlencoded
      new AuthMiddleware().verifyToken,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
})

app.listen()