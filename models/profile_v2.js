var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create a schema
var reviewSchema = new Schema({
  _id:ObjectId,
  business_id:String,
  topics:Object
});

var Profile_v2 = mongoose.model('profiles_v2', reviewSchema);
module.exports = Profile_v2;