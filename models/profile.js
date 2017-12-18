var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var reviewSchema = new Schema({
  _id:String,
  good_topic_words:Array, 
  bad_topic_words:Array, 
  good_topic_labels:Array, 
  bad_topic_labels:Array 
});

var Profile = mongoose.model('Profile', reviewSchema);
module.exports = Profile;