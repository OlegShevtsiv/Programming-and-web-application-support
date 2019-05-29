const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

//bring in article model
let Article = require('../models/article');

//bring in user model
let User = require('../models/user');

//load edit single  article
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(req.user.role != 'admin')
    {
      req.flash('danger', 'Access denied');
      res.redirect('/');
    }
     res.render('edit_article', {
       title:'Edit auto',
       article:article
     });
  });
});

// add route
router.get('/add', ensureAuthenticated, function(req, res)
{
  res.render('add_article', {
    title: 'Add new auto'
  });
});

//add submit post route
router.post('/add', function(req, res){
  let model = req.body.model;
  let cost = req.body.cost;
  let details = req.body.details;

  req.checkBody('model', 'Model is required field!').notEmpty();
  req.checkBody('cost', 'Cost is required field!').notEmpty();
  req.checkBody('cost', 'Incorrect cost!').isNumeric();
  req.checkBody('details', 'Details is required field!').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  }
  else{
    let article = new Article();
    article.model = req.body.model;
    article.cost = req.body.cost;
    article.details = req.body.details;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      }
      else{
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });
  }
});

//update article
router.post('/edit/:id', function(req, res){
  let model = req.body.model;
  let cost = req.body.cost;
  let details = req.body.details;

  req.checkBody('model', 'Model is required field!').notEmpty();
  req.checkBody('cost', 'Cost is required field!').notEmpty();
  req.checkBody('cost', 'Incorrect cost!').isNumeric();
  req.checkBody('details', 'Details is required field!').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    Article.findById(req.params.id, function(err, article){
       res.render('edit_article', {
         title:'Edit auto',
         article:article,
         errors:errors
       });
    });
  }
  else{

    let article = {};

    article.model = req.body.model;
    article.cost = req.body.cost;
    article.details = req.body.details;

    let query = {_id:req.params.id}

    Article.update(query, article, function(err){
      if(err){
        console.log(err);
        return;
      }
      else{
        req.flash('warning' , 'Auto Edited');
        res.redirect('/');
      }
    });
  }


});

router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(req.user.role != 'admin')
    {
      res.status(500).send();
    }
    else
    {
      Article.remove(query, function(err){
        if(err)
        {
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

//get single article


//get Ordering form
router.get('/buy/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
     res.render('buy', {
       title:'Buy Car',
       article:article
     });
  });
});

router.post('/buy/:id', function(req, res){
  let bankNumber = req.body.bankNumber;
  let cvv2 = req.body.cvv2;
  let phone = req.body.phone;
  let code = req.body.code;

  req.checkBody('bankNumber', 'Bunk account number is required field!').notEmpty();
  req.checkBody('cvv2', 'cvv2 is required field!').notEmpty();
  req.checkBody('cvv2', 'Details is required field!').isNumeric();
  req.checkBody('phone', 'Incorrect cost!').notEmpty();
  req.checkBody('code', 'Code is required field!').notEmpty();
  req.checkBody('code', 'Code is incorrect!').isNumeric();


  let errors = req.validationErrors();
  if(errors){
    Article.findById(req.params.id, function(err, article){
       res.render('buy', {
         title:'Buy auto',
         article:article,
         errors:errors
       });
    });
  }
  else{
    let query = {_id:req.params.id}

    Article.findById(req.params.id, function(err, article){
        Article.remove(query, function(err){
          if(err)
          {
            console.log(err);
            return;
          }
          else
          {
            req.flash('success', 'Thank you for your purchase!');
            res.redirect('/');
          }
          // res.send('Success');
        });
    });
  }
});

router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
      res.render('article', {
        article:article
      });
  });
});

//access control
function ensureAuthenticated(req, res, next)
{
  if(req.isAuthenticated()){
    return next();
  }
  else
  {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');

  }


}

module.exports = router;
