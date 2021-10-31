import AWS from 'aws-sdk';
import { myAwsConfig } from '../config';

const config = {
    aws_table_name: 'mycafe-users',
    aws_table_name2: '',
    aws_table_name3: '',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: myAwsConfig
}
import uuidv1 from 'uuid/v1';
class DB_Users{

    addUsers = (req ) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        //console.log(req, 'req')
        const Item = req;
        Item.id = uuidv1();
        Item.emailVerified = false;
        Item.createdAt = new Date().toISOString();
        Item.totalSMS = 1000;
        Item.usedSMS = 0;
        var params = {
            TableName: config.aws_table_name,
            Item: Item
        };

        // Call DynamoDB to add the item to the table
        docClient.put(params, function (err, data) {
            
        });
    }
    
    setSMSCounter = ( req, res) => {

        
    }
    getSettings = ( req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        var params = {
            TableName: config.aws_table_name,
            Key: {
                username: req.username
            }
        };
        //console.log(params, 'get getSettings')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
             
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err
                }).end();
            } else {
                  if (data.Item) {
                    data.Item.username = null;
                    data.Item.password = null;
                    data.Item.email = null;
                    data.Item.cellPhone = null;
                    data.Item.cellphone = null;
                    data.Item.id = null;
                    
                  }
                    
                //console.log(data, ' getSettings,')
                res.status(200).send({
                    success: true,
                    message: 'get getSettings',
                    data
                }).end();
            }
        });
    }
    getUsers = (append, req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        var params = {
            TableName: config.aws_table_name,
            Key: {
                username: req.username
            }
        };
        //console.log(params, 'get user')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
              //console.log(err, 'err') 
              //console.log(append,data, 'data')
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err
                }).end();
            } else {
               
                res.status(200).send({
                    success: true,
                    message: 'get user',
                    data,
                    append
                }).end();
            }
        });
    }
    emailVerified = (req) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                username: req.body.username
            },
            UpdateExpression: `set emailVerified = :emailVerified`,
            ExpressionAttributeValues: {
                ":emailVerified": true
            },
        };
        //console.log(params, 'update user')
          // Call DynamoDB to delete the item to the table
          docClient.update(params, function (err, data) {
              
              
            
        });
    }
    updateUser = (req, res) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: config.aws_table_name,
            Key: {
                username: req.username
            },
            UpdateExpression: `set cafeName = :cafeName,
            cafeAddress = :cafeAddress,
            cellphone = :cellphone,
            product1 = :product1,
            product2 = :product2,
            product3 = :product3,
            product4 = :product4,
            product5 = :product5,
product6 = :product6,
product7 = :product7,
product8 = :product8,
product9 = :product9,
desc1 = :desc1,
desc2 = :desc2,
desc3 = :desc3,
desc4 = :desc4,
desc5 = :desc5,
desc6 = :desc6,
desc7 = :desc7,
desc8 = :desc8,
desc9 = :desc9,
perCost1 = :perCost1,
perCost2 = :perCost2,
perCost3 = :perCost3,
perCost4 = :perCost4,
perCost5 = :perCost5,
perCost6 = :perCost6,
perCost7 = :perCost7,
perCost8 = :perCost8,
perCost9 = :perCost9`,
            ExpressionAttributeValues: {
                ":cafeName": req.cafeName,
                ":cafeAddress": req.cafeAddress,
                ":cellphone": req.cellphone,
                ":product1": req.product1,
                ":product2": req.product2,
                ":product3": req.product3,
                ":product4": req.product4,
                ":product5": req.product5,
                ":product6": req.product6,
                ":product7": req.product7,
                ":product8": req.product8,
                ":product9": req.product9,
                ":desc1": req.desc1,
                ":desc2": req.desc2,
                ":desc3": req.desc3,
                ":desc4": req.desc4,
                ":desc5": req.desc5,
                ":desc6": req.desc6,
                ":desc7": req.desc7,
                ":desc8": req.desc8,
                ":desc9": req.desc9,
                ":perCost1": req.perCost1,
                ":perCost2": req.perCost2,
                ":perCost3": req.perCost3,
                ":perCost4": req.perCost4,
                ":perCost5": req.perCost5,
                ":perCost6": req.perCost6,
                ":perCost7": req.perCost7,
                ":perCost8": req.perCost8,
                ":perCost9": req.perCost9
            },
        };
        //console.log(params, 'update user')
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
                        message: 'update user',
                        data,
                        req
                    }).end();
                }
            
        });
    }
    
    
    SMSCounterAdd = (req) => {

        
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        var params = {
            TableName: config.aws_table_name,
            Key: {
                username: req.username
            }
        };
        //console.log(params, 'get user')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
              //console.log(err, 'err') 
              //console.log(append,data, 'data')
            if (err) {
                //console.log(err, 'err') 
            } else {
                const counter = (data.Item['usedSMS'] + 1)
                console.log(counter, 'data');
                var params = {
                    TableName: config.aws_table_name,
                    
                    Key: {
                        username: req.username
                    },
                    UpdateExpression:"set usedSMS = :usedSMS",
                    ExpressionAttributeValues: {
                        ":usedSMS": counter
                        
                    },
                };
                docClient.update(params, function (err, data) {
                        if (err) {
                        console.log('err in sms counter add', err)
                        } else {
                            console.log('Success', data)
                        }
                    
                });
            }
        });

        
    }
}
export default DB_Users;