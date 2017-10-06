var http = require('http');
var express = require("express");
var app     = express();
// var fs = require('fs');

app.use(express.static(__dirname + '/client'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/client/index.html'));
  });

app.listen(8080);
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     var data = fs.readFileSync('./client/index.html')
//     res.write(data);
//     var data = fs.readFileSync('./client/app.js')
//     res.write(data);
//     res.end();

//     console.log("intercepted a request", req.url);
//     console.log("");
//     });

// server.listen(8080);