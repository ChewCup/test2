const express = require('express');
const app = express();
var fs = require("fs");
const url = require("url");
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');

http.listen(8080, () => {
    console.log('listening on 8080');

});
app.use(express.static("public"))
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.sendFile("/index.html", {root: __dirname})
 }); 

app.get('/append?', (req,res) => {
    res.json("/append.html")
    });

app.get("/append?:name", function(req,res) {
    res.json("Id is "+req.query.name)
});

app.get("/append?:nameclass", function(req,res) {
    res.json("Id is "+req.query.nameclass)
});
    

    /*res.write("<table>");
    var name = query.name;
    var nameclass = query.nameclass;
    res.write("<p>Created " + name + " as " + nameclass + " \class\ </p>");
    fs.appendFileSync('charlist.lis', name + " " + nameclass + "\n");
    let data = fs.readFileSync('charlist.lis');
    let lines = data.toString().split(/\r?\n/);
    for (l of lines) {
         res.write("<p>" + l + "</p>");
    }
        res.write("</table>");*/


