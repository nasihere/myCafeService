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
        console.log(req, 'req')
        const Item = req;
        Item.id = uuidv1();
        Item.createdAt = new Date().toISOString();
        var params = {
            TableName: config.aws_table_name,
            Item: Item
        };

        // Call DynamoDB to add the item to the table
        docClient.put(params, function (err, data) {
            if (err) {
               console.log({
                    success: false,
                    message: err
                });
            } else {
                console.log({
                    success: true,
                    message: 'Added Users',
                    data,
                    id: Item.id,
                    params
                });
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
        console.log(params, 'get user')
          // Call DynamoDB to delete the item to the table
          docClient.get(params, function (err, data) {
              console.log(err, 'err')
              console.log(append,data, 'data')
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
}
export default DB_Users;