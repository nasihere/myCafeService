
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
}
export default DB_Session;