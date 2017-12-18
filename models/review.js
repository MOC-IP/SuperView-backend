var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var reviewSchema = new Schema({
  _id:String,
  user_id:String,
  business_id:String,
  category_id:String,
  text: String,
  date:Date,
  stars:Number,
  cool:Number,
  funny:Number,
  useful:0,
  words :[String]  
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;