import * as express from 'express'
import { Request, Response } from 'express'
import DB_Session from '../services/session.service';

class SessionController {
    public path = '/agent'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/create', [], this.create)
        
        this.router.post('/findByPCName', [], this.findByPCName)
        
        this.router.post('/findAllPcs', [], this.getAgentPCs)
        this.router.post('/onlineAgent', [], this.onlineAgent)
        this.router.post('/findAgentDetail', [], this.findAgentDetail)
        this.router.post('/bookAgent', [], this.bookAgent)
        this.router.post('/unlockAgent', [], this.unlockAgent)

        

      }


    create = (req: Request, res: Response) => {
    
      console.log(req.body, 'request body')
      new DB_Session().addAgentPC( req.body, res);
     
    }


    findByPCName = (req: Request, res: Response) => {
      
      console.log(req.body)
      
      const { pcname, username } = req.body;
           
      let userAttr =  { pcname, username }
      
      new DB_Session().getAgentPCByName(userAttr, res);
     
    }

    getAgentPCs = (req: Request, res: Response) => {
      
        console.log(req.body)
        
        const {  username } = req.body;
             
        let userAttr =  {  username }
        
        new DB_Session().getAgentPCs(userAttr, res);
       
      }
      onlineAgent = (req: Request, res: Response) => {
      
        console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().onlineAgent(userAttr, res);
       
      }
      findAgentDetail = (req: Request, res: Response) => {
      
        console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().findAgentDetails(userAttr, res);
       
      }
      bookAgent  = (req: Request, res: Response) => {
      
        console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().bookAgent(userAttr, res);
       
      }
      unlockAgent = (req: Request, res: Response) => {
      
        console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().unlockAgent(userAttr, res);
       
      }
}

export default SessionController