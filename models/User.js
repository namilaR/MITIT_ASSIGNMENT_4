/**
 * Created by namila on 5/20/17.
 */

var mongoose = require('./connection');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// create a schema
var userSchema = new Schema({
        fname: String,
        lname: String,
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},

    },
    {
        timestamps: true
    }
);

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);

