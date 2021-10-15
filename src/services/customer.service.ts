import AWS from 'aws-sdk';
import { myAwsConfig } from '../config';

const config = {
    aws_table_name: 'mycafe-customer',
    aws_table_name2: 'mycafe-customer-doc',
    aws_table_name3: 'mycafe-check-in-out',
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
        console.log(req, 'req')
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
    getCustomerByCellPhone = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        console.log(req, 'Item')
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'cellphone = :cellphone',
            ExpressionAttributeValues: {
              ":cellphone":  Item.cellphone 
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

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        Item.id = uuidv1();
        var params = {
            TableName: config.aws_table_name3,
            Item: {
                id:  Item.id,
                custid: req.custid,
                timein: new Date().toISOString(),
                computerno: req.computerno,
                inside: true
            }
        };
          // Call DynamoDB to checkin the item to the table
          docClient.put(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'add checkin document',
                    data,
                    id:  Item.id
                });
            }
        });
    }
    checkout = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        var params = {
            TableName: config.aws_table_name3,
            Key: {
                id: req.id
            },
            UpdateExpression: `set inside = :inside, timeout = :timeout`,
            ExpressionAttributeValues: {
                ":inside": false,
                ":timeout":  new Date().toISOString(),
            },
        };
        console.log('params', params)
          // Call DynamoDB to checkin the item to the table
          docClient.update(params, function (err, data) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.send({
                    success: true,
                    message: 'update checkout document',
                    data,
                    id:  Item.id
                });
            }
        });
    }
    getCustomerBySearchText = (req, res) => {

        AWS.config.update(config.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const Item = req;
        console.log(req, 'Item')
        
        var params = {
            TableName: config.aws_table_name,
            FilterExpression: 'contains (searchText, :searchText)',
            ExpressionAttributeValues: {
              ":searchText":  Item.searchText.toString().toLowerCase(),
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
}
export default DB_Customer;