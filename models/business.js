var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var businessSchema = new Schema({
  _id:String,
  name: String,
  neighborhood: String,
  address:String,
  city: String,
  state: String,
  postal_code: String,
  latitude: Number,
  longitude: Number,
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: {
    BusinessParking: {
      garage: Boolean,
      street: Boolean,
      validated: Boolean,
      lot: Boolean,
      valet: Boolean
    },
    WiFi: String,
    BusinessAcceptsCreditCards: Boolean,
    RestaurantsPriceRange2: Number,
    BikeParking: Boolean,
    GoodForKids: Boolean
  },
  categories: [String],
  category_id:Number,
  hours: {
    Monday: String,
    Tuesday: String,
    Friday: String,
    Wednesday: String,
    Thursday: String,
    Sunday: String,
    Saturday: String
  }
});

var Business = mongoose.model('Business', businessSchema);
module.exports = Business;