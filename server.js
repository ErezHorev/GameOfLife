var http = require('http');
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/client'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/client/index.html'));
  });

app.listen(8080);
