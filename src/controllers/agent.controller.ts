import { Socket } from '../web-socket';
import * as express from 'express'
import { Request, Response } from 'express'
import DB_Session from '../services/session.service';
class SessionController {
    public path = '/agent'
    public router = express.Router()
    socket =  new Socket();
    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/create', [], this.create)
        this.router.post('/remove', [], this.removeAgent)
        
        this.router.post('/findByPCName', [], this.findByPCName)
        
        this.router.post('/findAllPcs', [], this.getAgentPCs)
        this.router.post('/onlineAgent', [], this.onlineAgent)
        this.router.post('/findAgentDetail', [], this.findAgentDetail)
        this.router.post('/bookAgent', [], this.bookAgent)
        this.router.post('/unlockAgent', [], this.unlockAgent)
        this.router.post('/billpaid', [], this.billpaid)
        this.router.post('/billingStart', [], this.billingMisc)
        this.router.post('/billingSessions', [], this.billingSessions)
        this.router.post('/billingHistory', [], this.billingHistory)
        
        this.router.post('/SOCKET/LOCk', [], this.socketHandler)
        this.router.post('/SOCKET/SHOW', [], this.socketHandler)
        this.router.post('/SOCKET/HIDE', [], this.socketHandler)
        this.router.post('/SOCKET/CLEAR_HISTORY', [], this.socketHandler)
        this.router.post('/SOCKET/SHUTDOWN_PC', [], this.socketHandler)
        this.router.post('/SOCKET/AGENT_CLOSED', [], this.socketHandler)
        
        

      }
      socketHandler = (req: Request, res: Response) => {
        const agentid = req.body.agentid;
        const action = req.body.action;
        const timer = req.body.timer;

        this.socket.send({agentid, action, timer})
        res.status(200).send({
          success: true, 
        }).end();
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
        new DB_Session().billingStart(userAttr, res);
      }

       bookAgent  = (req: Request, res: Response) => {
      
        //console.log(req.body, 'bookAgent body')
        
        
             
        let userAttr =  {  ...req.body }
        if (userAttr.pcstatus == 'busy') {
          new DB_Session().billingStart(userAttr, res);
        }
        else if (userAttr.pcstatus == 'finished') {
         
          new DB_Session().billingEnd(userAttr, res);
        }
        else {
          new DB_Session().bookAgent(userAttr, res);
        }
       
      }
      removeAgent = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().removeAgent(userAttr, res);
       
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
      billingSessions = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().billingSessions(userAttr, res);
       
      }
      billingHistory = (req: Request, res: Response) => {
      
        //console.log(req.body)
        
        
             
        let userAttr =  {  ...req.body }
        
        new DB_Session().billingHistory(userAttr, res);
       
      }
}

export default SessionController