const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash  = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/Task2Db');
let db = mongoose.connection;
//check connection
db.once('open', function(){
  console.log('connected to MongoDb');
});


//check for db errors
db.on('error', function(err){
  console.log(err);
});

//init App
const app = express();


//bring in models
let Article = require('./models/article');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//express session midlewhare
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    while(namespace.lenght)
    {
      formParam += '[' + namespace.shift() + ']';
    }
    return
    {
      param : formParam,
      msg = msg,
      value = value
    };
  }
}));


// Home route
app.get('/', function(req, res)
{
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    }
    else{
      res.render("index", {
        title:'Judas priest',
        articles: articles
      });
    }
  });
});

//route files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


//start server
app.listen(3000, function()
{
  console.log("metal forever!!!");
});