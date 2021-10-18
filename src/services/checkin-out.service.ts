
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
class DB_CHECKIN_OUT{


    selfCheckIn  = (req, res) => {
        
    }
}
export default DB_CHECKIN_OUT;