/**
 * Created by namila on 5/20/17.
 */

var mongoose = require('./connection');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// create a schema
var bookSchema = new Schema({
        subject: String,
        title: String,
        authorsName: String,
        year: String,
        publisher: String,
        bookCover:  { data: Buffer, contentType: String },
        qty : String

    },
    {
        timestamps: true
    }
);



module.exports = mongoose.model('Book', bookSchema);

