import AWS from 'aws-sdk';
import { myAwsConfig } from '../config';

const config = {
    aws_table_name: 'mycafe-customer',
    aws_table_name2: 'mycafe-customer-doc',
    aws_table_name3: 'mycafe-check-in-out',
    aws_table_name4: 'mycafe-billing',
    aws_table_session: 'mycafe-session',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: myAwsConfig
}
import uuidv1 from 'uuid/v1';
class DB_Customer{

    addCustomer = (req, res) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        //console.log(req, 'req')
        const Item = req;
        Item.id = uuidv1();
        Item.createdAt = new Date().toISOString();
        Item.searchText = JSON.stringify(Item).toString().toLowerCase();
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
                    message: 'Added customer',
                    data,
                    req: req.body,
                    id: Item.id
                });
            }
        });
    }
    deleteCustomer = (req, res) => {
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        var params = {
            TableName: config.aws_table_name,
            Key: {
                id: req.id
            }
        };
          // Call DynamoDB to delete the item to the table
          docClient.delete(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'Deleted Item',
                    data
                });
            }
        });
    }
    getBillingId = (req, res) => {
        if (!req.id) return;
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        
        var params = {
            TableName: config.aws_table_name4,
            Key: {
                id: req.id
            }
        };
        //console.log(params, ' getBillingId  ')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
              
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err
                }).end();
            } else {
                res.status(200).send({
                    success: true,
                    message: ' getBillingId ',
                    data
                }).end();
            }
        });
    }
    getCustomerById = (req, res) => {
        if (!req.id) {
            res.status(400).send({
                success: false,
                message: 'customer id is null'
            }).end();
            return };
       
        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        if (req.id == '' || req.id == 'public') {
           
            const  params = {
                TableName: config.aws_table_name,
                FilterExpression: 'cellphone = :cellphone AND username = :username',
               
                ExpressionAttributeValues: {
                    ":cellphone": '8888555538',
                    ":username": req.username
                }
            };
            docClient.scan(params, function (err, data) {
                //console.log(err, 'err') 
                //console.log(data, 'data')
              if (err) {
                  res.status(400).send({
                      success: false,
                      message: err
                  }).end();
              } else {
                  res.status(200).send({
                      success: true,
                      message: 'get getCustomerById machine ',
                      data
                  }).end();
              }
          });
        }
        else {

            const params = {
                TableName: config.aws_table_name,
                Key: {
                    id: req.id
                }
            };
            docClient.get(params, function (err, data) {
                //console.log(err, 'err') 
                //console.log(data, 'data')
              if (err) {
                  res.status(400).send({
                      success: false,
                      message: err
                  }).end();
              } else {
                  res.status(200).send({
                      success: true,
                      message: 'get getCustomerById machine ',
                      data
                  }).end();
              }
          });
        }
        //console.log(params, 'get getCustomerById machine ')
          // Call DynamoDB to delete the item to the table
         
    }
    getCustomerByCellPhone = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        //console.log(req, 'Item')
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'cellphone = :cellphone AND username = :username',
            ExpressionAttributeValues: {
              ":cellphone":  Item.cellphone,
              ":username": Item.username
            }
        };
        //console.log(params, 'params')
          // Call DynamoDB to delete the item to the table
          docClient.scan(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err,
                    customerNotFound: true
                });
            } else {
                if (!data.Count) {
                    res.send({
                        success: false,
                        message: err,
                        otpVerification: false,
                        customerNotFound: true
                    });
                    return;
                }
                res.send({
                    success: true,
                    message: 'get Item',
                    data,
                    customerNotFound: false
                });
            }
        });
    }
    uploadDocument = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        Item.id = uuidv1();
        var params = {
            TableName: config.aws_table_name2,
            Item: {
                id:  Item.id,
                desciption: req.description,
                custid: req.custid,
                filenumber: req.filenumber
            }
        };
          // Call DynamoDB to delete the item to the table
          docClient.put(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'get uploaded document',
                    data,
                    id:  Item.id
                });
            }
        });
    }
    
    checkin = (req, res) => {

        // AWS.config.update(config.aws_remote_config);
        // const docClient = new AWS.DynamoDB.DocumentClient();
        // const Item = req;
        // Item.id = uuidv1();
        // var params = {
        //     TableName: config.aws_table_name3,
        //     Item: {
        //         id:  Item.id,
        //         custid: req.custid,
        //         timein: new Date().toISOString(),
        //         computerno: req.computerno,
        //         inside: true
        //     }
        // };
        //   // Call DynamoDB to checkin the item to the table
        //   docClient.put(params, function (err, data) {
        //     if (err) {
        //         res.send({
        //             success: false,
        //             message: err
        //         });
        //     } else {
        //         res.send({
        //             success: true,
        //             message: 'add checkin document',
        //             data,
        //             id:  Item.id
        //         });
        //     }
        // });
    }
    checkout = (req, res) => {

        // AWS.config.update(config.aws_remote_config);
        // const docClient = new AWS.DynamoDB.DocumentClient();
        // const Item = req;
        // var params = {
        //     TableName: config.aws_table_name3,
        //     Key: {
        //         id: req.id
        //     },
        //     UpdateExpression: `set inside = :inside, timeout = :timeout`,
        //     ExpressionAttributeValues: {
        //         ":inside": false,
        //         ":timeout":  new Date().toISOString(),
        //     },
        // };
        // //console.log('params', params)
        //   // Call DynamoDB to checkin the item to the table
        //   docClient.update(params, function (err, data) {
        //     if (err) {
        //         res.send({
        //             success: false,
        //             message: err
        //         });
        //     } else {
        //         res.send({
        //             success: true,
        //             message: 'update checkout document',
        //             data,
        //             id:  Item.id
        //         });
        //     }
        // });
    }
    findCustomerIdByActivity = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        //console.log(req, 'Item')
        
        var params = {
            TableName: config.aws_table_name4,
            FilterExpression: 'customerid = :customerid and username = :username',
            ExpressionAttributeValues: {
              ":customerid":  Item.customerId,
              ":username":  Item.username
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
                    message: 'get Item',
                    data
                });
            }
        });
    }
    getCustomerBySearchText = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        //console.log(req, 'Item')
        
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'contains (searchText, :searchText) and username = :username',
            ExpressionAttributeValues: {
              ":searchText":  Item.searchText.toString().toLowerCase(),
              ":username":  Item.username
            },
            Limit: Item.pageLimit || 1000
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
                    message: 'get Item',
                    data
                });
            }
        });
    }
}
export default DB_Customer;