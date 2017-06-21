/**
 * Created by namila on 5/20/17.
 */

var mongoose = require('./connection');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Modules = require('../models/ModelsMap');
var User = Modules.User;

// create a schema
var bookSchema = new Schema({
        subject: String,
        title: String,
        authorsName: String,
        year: String,
        publisher: String,
        bookCover: String,
        bookFile: String,
        description : String,
        uploadedBy : [{ type: Schema.Types.ObjectId, ref: 'User' }]

    },
    {
        timestamps: true
    }
);

bookSchema.methods.getObjectId = function (stringId) {
    return new mongoose.Types.ObjectId(stringId);
};

module.exports = mongoose.model('Book', bookSchema);

