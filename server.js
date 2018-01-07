var http = require("http");
var express = require('express');
var app = express();
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require("cors")
var server = http.createServer(app);
let port = process.env.PORT || 8080;

/*
 jwt middleware
*/
var jwtCheck = require('./middlewares/auth');

app.use(bodyParser.urlencoded({ extended: false })); //Parses urlencoded bodies
app.use(bodyParser.json()) //SendJSON response
app.use(logger('dev'))
app.use(cors());

/*
db connection
*/

let UserController = require('./controllers/userController');
let userController = new UserController();
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



app.use('/profile/:id',jwtCheck);
app.get('/business/:id',jwtCheck);
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
    // console.log("-----------------USER-----------------------")
    // console.log(req.user);
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

app.route('/auth/register')
    .post(userController.register);
app.route('/auth/sign_in')
    .post(userController.sign_in);
mongoose.connect(connectionString, options)
.then((db) => {
        server.listen(port, () => {
                console.log(`backend listening on port ${port}`);
        });
})
.catch((err) => {
    console.log(err);
});
