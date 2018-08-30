var dotenv = require('dotenv').config();
var express = require('express');
var cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var LocalStrategy = require('strategy');
var nodemailer = require('nodemailer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
let options = {
    autoIndex:false, 
    autoReconnect:true, 
    promiseLibrary:global.Promise
};
var request = require('request');
var fs = require('fs');
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;


//Init App
var app = express();

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers, *, X-Requested-With, Content-Type, Accept");
  next();
*/




// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())

// Express Session
app.use(session({
    secret: 'asdf33g4w4hghjkuil8saef345',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var routes = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images');
//var copy = require('./routes/copy');

app.use('/routes', routes);
app.use('/routes/users', users);
app.use('/routes/images', images);
//app.use('/routes/copy', copy);



app.get('/favicon.ico', (req, res) => res.status(204)); //temp

app.get('/', function (req, res) {
    console.log('success')
})

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});