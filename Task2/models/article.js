let mongoose = require('mongoose');

//article schema
let articleSchema = new mongoose.Schema({
    title:
    {
      type:String,
      required:true
    },
    author:
    {
      type:String,
      require:true
    },
    body:
    {
      type:String,
      require:true
    }

});

let Article = module.exports = mongoose.model('Article', articleSchema);
