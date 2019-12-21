var express = require('express');
var multer = require('multer');

var app = express();

//storage object to handle disc storing method

var storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./uploads');
    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    }
});

//upload file handler
var upload = multer({ storage,storage}).single('myfile');

//html file handling
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

// file upload post request handler

app.post('/uploadFile', function(req,res){
    upload(req,res,function(err){
        if(err){
            return res.send('Error Handling file');

        } else {
            res.send(
                '<h3>File Uploaded Successfully <a href="/">Return to Form</a> </h3>'
            );
        }
    });
});

app.listen(2500, function(){
    console.log('Server is up and running in http://localhost:2500/');
});