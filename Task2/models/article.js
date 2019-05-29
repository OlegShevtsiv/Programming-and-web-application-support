let mongoose = require('mongoose');

//article schema
let articleSchema = new mongoose.Schema({
    model:
    {
      type:String,
      required:true
    },
    cost:{
      type:String,
      required:true
    },
    details:
    {
      type:String,
      require:true
    }

});

let Article = module.exports = mongoose.model('Article', articleSchema);
