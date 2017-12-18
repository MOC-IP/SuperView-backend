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

/*
db connection
*/
let db = require('./db_config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let User = require('./models/user');
let Business = require('./models/business');
let Review = require('./models/review');
let Profile = require('./models/profile');
var options = {
    useMongoClient: true
};
var connectionString = `mongodb://${db.username}:${db.password}@${db.url}:${db.port}/${db.db_name}?authSource=admin`


app.get('/business/:id', (req, res) => {
   Business.findOne({"_id": req.params.id}).then((data,err) => 
   {
       if(err)
        {
            return res.status(404).send({"msg":"business not present in dataset"});
        }
        return res.status(200).send(data);
   })
});

app.get('/profile/:id', (req, res) => {
    Profile.findOne({"_id": req.params.id}).then((data,err) => 
    {
        if(err)
         {
             return res.status(404).send({"msg":"business not present in dataset"});
         }
         return res.status(200).send(data);
    })
});

app.get('/business/:id/weaknesses', (req, res) => {
    res.send('not implemented')
});

mongoose.connect(connectionString, options)
.then((db) => {
        server.listen(port, () => {
                console.log(`backend listening on port ${port}`);
        });
})
.catch((err) => {
    console.log(err);
});
