const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = require('./config').BUCKET_NAME;

const ID =   require('./config').accessKeyId
const SECRET = require('./config').secretAccessKey;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
console.log(BUCKET_NAME, SECRET)

var fileExtension = require('file-extension')
const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');

// Express settings
const app = express();
app.use(cors());

app.get('/api', function (req, res) {
  res.end('File catcher');
});
// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'my_uploaded_files')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(req.body , 'body')
    console.log(file, 'file')
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    // Read content from the file
    const fileContent = fs.readFileSync(file.path);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.filename, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            uploadedFile: file,
            s3URL: data.Location
        })
    
    });

   
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

// Create PORT
const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})

// const uploadFile = (fileName) => {
//     // Read content from the file
//     const fileContent = fs.readFileSync(fileName);

//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: 'cat.jpg', // File name you want to save as in S3
//         Body: fileContent
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//     });
// };