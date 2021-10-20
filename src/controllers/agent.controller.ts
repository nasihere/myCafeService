import * as express from 'express'
import { Request, Response } from 'express'
import DB_Session from '../services/session.service';
class SessionController {
    public path = '/agent'
    public router = express.Router()

    constructor(public socket) {
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
        this.router.post('/billpaid', [], this.billpaid)
        this.router.post('/billingStart', [], this.billingMisc)
        this.router.post('/billingSessions', [], this.billingSessions)

        
        

      }


    create = (req: Request, res: Response) => {
    
      //console.log(req.body, 'request body')
      new DB_Session().addAgentPC( req.body, res);
     
    }


    findByPCName = (req: Request, res: Response) => {
      
      //console.log(req.body)
      
      const { pcname, username } = req.body;
           
      let userAttr =  { pcname, username }
      
      new DB_Session().getAgentPCByName(userAttr, res);
     
    }

    getAgentPCs = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        const {  username } = req.body;
             
        let userAttr =  {  username }
        
        new DB_Session().getAgentPCs(userAttr, res);
       
      }
      onlineAgent = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().onlineAgent(userAttr, res);
       
      }
      findAgentDetail = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().findAgentDetails(userAttr, res);
       
      }
      billingMisc  = (req: Request, res: Response) => {
        //console.log(req.body)
        let userAttr =  {  ...req.body }
        new DB_Session().billingStart(userAttr, res, this.socket);
      }

       bookAgent  = (req: Request, res: Response) => {
      
        //console.log(req.body, 'bookAgent body')
        
        
             
        let userAttr =  {  ...req.body }
        if (userAttr.pcstatus == 'busy') {
          new DB_Session().billingStart(userAttr, res, this.socket);
        }
        else if (userAttr.pcstatus == 'finished') {
         
          new DB_Session().billingEnd(userAttr, res, this.socket);
        }
        else {
          new DB_Session().bookAgent(userAttr, res);
        }
       
      }
      unlockAgent = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().unlockAgent(userAttr, res);
       
      }
      billpaid = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().billpaid(userAttr, res);
       
      }
      billingSessions= (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().billingSessions(userAttr, res);
       
      }
}

export default SessionController