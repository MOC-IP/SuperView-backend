var http = require("http");
var express = require('express')
var app = express();
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require("cors")

var server = http.createServer(app);
let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false })); //Parses urlencoded bodies
app.use(bodyParser.json()) //SendJSON response
app.use(logger('dev'))
app.use(cors());


app.get('/business/:id', (req, res) => {
    res.send('not implemented')
});

app.get('/business/:id/strengths', (req, res) => {
    res.send('not implemented')
});

app.get('/business/:id/weaknesses', (req, res) => {
    res.send('not implemented')
});

server.listen(port, () => {
        console.log(`backend listening on port ${port}`);
});
