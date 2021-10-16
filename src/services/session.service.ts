
import AWS from 'aws-sdk';
import { myAwsConfig } from '../config';

const config = {
    aws_table_name: 'mycafe-session',
    aws_table_name2: 'mycafe-billing',
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
            UpdateExpression: `set agentOnline = :agentOnline, lastResponseAt = :lastResponseAt`,
            ExpressionAttributeValues: {
                ":agentOnline": req.online,
                ":lastResponseAt": new Date().toISOString()
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
            pcstatus = :pcstatus,
            customerId = :customerId,
            billingId = :billingId`,
            ExpressionAttributeValues: {
                ":accessCode": req.accessCode,
                ":accessAt": req.accessAt,
                ":timer": req.timer,
                ":pcstatus": req.pcstatus,
                ":customerId": req.customerId,
                ":billingId": req.billingId || null
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
    updateBillingEnd = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.agentid
            },
            UpdateExpression: `set  pcstatus = :pcstatus, accessCode = :accessCode, timer = :timer, lastResponseAt = :lastResponseAt, accessAt = :accessAt, customerId = :customerId`,
            ExpressionAttributeValues: {
                ":pcstatus": req.pcstatus,
                ":accessCode": null,
                ":timer": null,
                ":lastResponseAt": new Date().toISOString(),
                ":accessAt": null,
                ":customerId": null
            },
        };
        console.log(params, 'updateBillingId ')
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
    
    updateBillPaid = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.agentid
            },
            UpdateExpression: `set  pcstatus = :pcstatus, customerId = :customerId`,
            ExpressionAttributeValues: {
                ":pcstatus": req.pcstatus,
                ":customerId": null
            },
        };
        console.log(params, 'updateBillPaid ')
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
                        message: 'updateBillPaid ',
                        data,
                        req
                    }).end();
                }
            
        });
    }
    updateBillingId = (req, res) => {
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.agentid
            },
            UpdateExpression: `set billingId = :billingId, pcstatus = :pcstatus`,
            ExpressionAttributeValues: {
                ":billingId": req.billingId || null,
                ":pcstatus": req.pcstatus
            },
        };
        console.log(params, 'updateBillingId ')
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

    billingStart  = (req, res) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
 
        let Item = {
            id: uuidv1(), 
            billDt:  new Date().toISOString() ,
            agentid: req.agentid,
            customerid: req.customerid,
            username: req.username,
            checkIn: new Date().toISOString(),
            checkout: null,
            timer: req.timer,
            billPaid: false
        };
        // Item.paid = req.paid;
        // Item.paidDt = req.paidDt;
        // Item.cash = req.cash || 'cash';
        // Item = {...req.products,...req.costs, Item};
        
        
        var params = {
            TableName: config.aws_table_name2,
            Item: Item
        };
        console.log(params, 'billing start')
        // Call DynamoDB to add the item to the table
        docClient.put(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                req.billingId = Item.id;
                req.agentid = Item.agentid;
                new DB_Session().updateBillingId(req, res);

            }
        });
        
    }
    billingEnd = (req, res) => {
        if (!req.billingId) return;
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        console.log(req, 'req')
        let Item = req;
        Item.checkout = new Date().toISOString();
      
        

        var params = {
            TableName: config.aws_table_name2,
            Key: {
                id: req.billingId,
            },
            UpdateExpression: `set checkout = :checkout`,
            ExpressionAttributeValues: {
                ":checkout": new Date().toISOString()
            },
        };


        console.log(params, 'customer billing end')
          // Call DynamoDB to delete the item to the table
        docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                } else {
                    req.billingId = Item.id;
                    req.agentid = Item.agentid;
                    new DB_Session().updateBillingEnd(req, res);

                }
            
        });
        
    }
    billpaid = (req, res) => {
        if (!req.billingId) return;
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        console.log(req, 'req')
        let Item = req;
      
        

        var params = {
            TableName: config.aws_table_name2,
            Key: {
                id: req.billingId,
            },
            UpdateExpression: `set billPaid = :billPaid, 
            billTotal = :billTotal,
            productCode1 = :productCode1,
            productQty1 = :productQty1,
            productCost1 = :productCost1,
            
            productCode2 = :productCode2,
            productQty2 = :productQty2,
            productCost2 = :productCost2,
            
            
            productCode3 = :productCode3,
            productQty3 = :productQty3,
            productCost3 = :productCost3,
            
            productCode4 = :productCode4,
            productQty4 = :productQty4,
            productCost4 = :productCost4,

            productCode5 = :productCode5,
            productQty5 = :productQty5,
            productCost5 = :productCost5,

            productCode6 = :productCode6,
            productQty6 = :productQty6,
            productCost6 = :productCost6,

            productCode7 = :productCode7,
            productQty7 = :productQty7,
            productCost7 = :productCost7,

            productCode8 = :productCode8,
            productQty8 = :productQty8,
            productCost8 = :productCost8,

            productCode9 = :productCode9,
            productQty9 = :productQty9,
            productCost9 = :productCost9
            `,
            ExpressionAttributeValues: {
                ":billTotal": req.billTotal,
                ":productCode1": req.productCode1,
                ":productQty1": req.productQty1,
                ":productCost1": req.productCost1,
                
                ":productCode2": req.productCode2,
                ":productQty2": req.productQty2,
                ":productCost2": req.productCost2,
                
                ":productCode3": req.productCode3,
                ":productQty3": req.productQty3,
                ":productCost3": req.productCost3,
                
                ":productCode4": req.productCode4,
                ":productQty4": req.productQty4,
                ":productCost4": req.productCost4,
                
                ":productCode5": req.productCode5,
                ":productQty5": req.productQty5,
                ":productCost5": req.productCost5,
                
                ":productCode6": req.productCode6,
                ":productQty6": req.productQty6,
                ":productCost6": req.productCost6,
                
                
                ":productCode7": req.productCode7,
                ":productQty7": req.productQty7,
                ":productCost7": req.productCost7,
                
                
                ":productCode8": req.productCode8,
                ":productQty8": req.productQty8,
                ":productCost8": req.productCost8,
                
                
                ":productCode9": req.productCode9,
                ":productQty9": req.productQty9,
                ":productCost9": req.productCost9,
                
                ":billPaid": true
            },
        };


        console.log(params, 'customer billing end')
          // Call DynamoDB to delete the item to the table
        docClient.update(params, function (err, data) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err
                    }).end();
                } else {
                    req.agentid = Item.agentid;
                    req.pcstatus = 'ready';
                    new DB_Session().updateBillPaid(req, res);

                }
            
        });
        
    }
}
export default DB_Session;