const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


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

//get single article
app.get('/article/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
     res.render('article', {
       article:article
     });
  });
});



// add route
app.get('/articles/add', function(req, res)
{
  res.render('add_article', {
    title: 'Add article'
  });
});

//add submit post route
app.post('/articles/add', function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/');
    }
  });
});


//start server
app.listen(3000, function()
{
  console.log("metal forever!!!");
});
