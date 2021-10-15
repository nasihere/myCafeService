
import AWS from 'aws-sdk';
import { myAwsConfig } from '../config';

const config = {
    aws_table_name: 'mycafe-session',
    aws_table_name2: '',
    aws_table_name3: '',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: myAwsConfig
}
import uuidv1 from 'uuid/v1';
class DB_Session{

    addAgentPC = (req, res ) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        console.log(req, 'req')
        const Item = req;
        Item.id = uuidv1();
        Item.pcname = req.pcname;
        Item.createdAt = new Date().toISOString();
        Item.username = req.username;
        Item.lastResponseAt = null;
        
        var params = {
            TableName: config.aws_table_name,
            Item: Item
        };

        // Call DynamoDB to add the item to the table
        docClient.put(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                
                res.send({
                    success: true,
                    message: 'get agent pc details',
                    data: {
                        ...params,
                        Count: 1
                    },
                    
                    id: Item.id,
                    
                });
            }
        });
    }
    getAgentPCByName = (req, res) => {
        
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        console.log(req, 'Item')
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'username = :username AND pcname = :pcname',
            ExpressionAttributeValues: {
              ":username":  Item.username,
              ":pcname": Item.pcname
            }
        };
        console.log(params, 'params')
          // Call DynamoDB to delete the item to the table
          docClient.scan(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'get agent pc details',
                    data
                });
            }
        });
    }

    getAgentPCs = (req, res) => {
        
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        console.log(req, 'Item')
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'username = :username ',
            ExpressionAttributeValues: {
              ":username":  Item.username,
             
            }
        };
        console.log(params, 'params')
          // Call DynamoDB to delete the item to the table
          docClient.scan(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'get all agent pc details',
                    data
                });
            }
        });
    }
    
    onlineAgent = (req, res) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.id
            },
            UpdateExpression: `set agentOnline = :agentOnline, lastResponseAt = :lastResponseAt, pcstatus = :pcstatus`,
            ExpressionAttributeValues: {
                ":agentOnline": req.online,
                ":lastResponseAt": new Date().toISOString(),
                ":pcstatus": 'ready'
            },
        };
        console.log(params, 'update agent pc')
          // Call DynamoDB to delete the item to the table
          docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'update agent',
                        data,
                        req
                    }).end();
                }
            
        });
    }
    findAgentDetails = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.id
            }
        };
        console.log(params, 'get agent machine ')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
              console.log(err, 'err') 
              console.log(data, 'data')
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err
                }).end();
            } else {
                res.status(200).send({
                    success: true,
                    message: 'get agent machine ',
                    data
                }).end();
            }
        });
    }
    bookAgent = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.id
            },
            UpdateExpression: `set accessCode = :accessCode,
            accessAt = :accessAt,
            timer = :timer,
            pcstatus = :pcstatus`,
            ExpressionAttributeValues: {
                ":accessCode": req.accessCode,
                ":accessAt": req.accessAt,
                ":timer": req.timer,
                ":pcstatus": req.pcstatus
            },
        };
        console.log(params, 'bookAgent ')
          // Call DynamoDB to delete the item to the table
          docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'bookAgent ',
                        data,
                        req
                    }).end();
                }
            
        });
    }
    unlockAgent = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        console.log(req, 'item accessCode unlockAgent')
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'id = :id AND accessCode = :accessCode',
            ExpressionAttributeValues: {
              ":id":  Item.id,
              ":accessCode": Number(Item.accessCode)
            }
        };
        console.log(params, 'accessCode params')
          // Call DynamoDB to delete the item to the table
          docClient.scan(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'get agent accessCode details',
                    data
                });
            }
        });
    }
}
export default DB_Session;