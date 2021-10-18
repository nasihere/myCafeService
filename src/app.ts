import express from 'express'
import { Application } from 'express'
import cors from 'cors';
const multer = require('multer');
const upload = multer();

const bodyParser = require("body-parser");


class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express()
      
        this.port = appInit.port

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
        //const allowedOrigins = ['http://localhost:4200'];

        const options: cors.CorsOptions = {
            origin: '*'
        };
        this.app.use(cors(options));
       this.app.use(upload.any());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            //console.log(`App listening on the http://localhost:${this.port}`)
        })
        
       
        
    }
}

export default App