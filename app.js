// https://www.youtube.com/watch?v=edwfgkhhNC0&list=PLurIMwd6GdChn-aQOy37lbwWG2YE1o0rG&index=1

const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const http = require('http').createServer(app);
const path = require("path");
/*const router = express.Router(); */
/*const querystring = require('querystring');*/
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile("/index.html", {root: __dirname})
    let data = fs.readFileSync('charlist.lis', 'utf8', {root: __dirname});
    
    let lines = data.toString().split(/\r?\n/);
    for (l of lines) {
        //res.write("<tr>\n");
        let wordlist = l.split(',');
        for (words of wordlist) {
            res.json("<td>" + words + "</td>");
        }
        //res.write("<tr>");
    }
}); 

app.get("/append", (res, req) => {
    req.sendFile(path.join(__dirname, "/append.html"));
    const charname = res.query.charname;
    const nameclass = res.query.nameclass;
    req.send("Name: " + charname + " Classname: " + nameclass);
    fs.appendFileSync('charlist.lis', charname + " " + nameclass + "\n");
});


http.listen(8080, () => {
    console.log('listening on 8080');
});

