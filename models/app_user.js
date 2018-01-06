var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
// create a schema
var appUserSchema = new Schema({
    fullName:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    hash_password:{
        type:String,
        required:true

    },
    created:{
        type:Date,
        default: Date.now
    },
    ownedBusinesses:Array
});

appUserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this._doc.hash_password);
}

var User = mongoose.model('app_user', appUserSchema);
module.exports = User;
