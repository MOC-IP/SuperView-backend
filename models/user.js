var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  _id:String,
  name: String,
  review_count: Number,
  yelping_since: Date,
  friends:[String],
  useful: Number,
  funny: Number,
  cool: Number,
  fans: Number,
  elite: [String],
  average_stars: Number,
  compliment_hot: Number,
  compliment_more: Number,
  compliment_profile: Number,
  compliment_cute: Number,
  compliment_list: Number,
  compliment_note: Number,
  compliment_plain: Number,
  compliment_cool: Number,
  compliment_funny: Number,
  compliment_writer: Number,
  compliment_photos: Number,
  category_id: Number 
});

var User = mongoose.model('User', userSchema);
module.exports = User;
