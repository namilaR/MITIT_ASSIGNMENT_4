/**
 * Created by namila on 5/20/17.
 */

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/assignment_4';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

module.exports = mongoose;