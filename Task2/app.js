const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


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

// add route
app.get('/articles/add', function(req, res)
{
  res.render('add_article', {
    title: 'add article'
  });
});

//start server
app.listen(3000, function()
{
  console.log("metal forever!!!");


});
