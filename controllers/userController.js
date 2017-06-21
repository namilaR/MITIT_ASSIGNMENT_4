/**
 * Created by namila on 5/20/17.
 */

var Modules = require('../models/ModelsMap');
var mongoose = require('mongoose');
var User = Modules.User;
var Book = Modules.Book;
var passport = require('passport');
var multiparty = require('multiparty');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;


UserController = function () {
    this.updateUser = function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                return err;
            }
            if (user.validPassword(req.body.oldpassword)) {
                user.fname = req.body.fname;
                user.lname = req.body.lname;
                user.password = user.encryptPassword(req.body.password);

                user.save(function (err, result) {
                    if (err)   throw err;
                    res.render('home', {username: req.user.username});
                });

            } else {
                req.flash('error', 'old password is incorrect');
                res.render('profile', {username: req.user.username, user: req.user});
            }

        })
    }

    this.deleteUser = function (req, res) {
        User.findOneAndRemove({username: req.user.username}, function (err, user) {
            if (err) {
                return err;
            }
            req.logout();
            res.redirect('/');
        })
    }

    this.insertBook = function (req, res) {
        var newBook = Book();
        newBook.subject = req.body.subject;
        newBook.title = req.body.btitle;
        newBook.authorsName = req.body.aname;
        newBook.year = req.body.year;
        newBook.publisher = req.body.publisher;
        newBook.description = req.body.description;
        newBook.bookCover = 'bookCover/' + req.files['bookCover'][0].originalname;
        newBook.bookFile = 'bookFile/' + req.files['bookFile'][0].originalname;
        newBook.uploadedBy = req.user;

        newBook.save(function (err, result) {
            if (err)   throw err;
            res.render('home', {username: req.user.username});
        });

    }

    this.getAllBooks = function (req, res) {
        Book.find({},function (err,books) {
            if (err)   throw err;
            res.render('book-list', {username: req.user.username , books : books});
        });
    }
    this.getABook = function (req, res) {
        Book.findOne({ _id : new mongoose.Types.ObjectId(req.params.bookId) },function (err,book) {
            if (err)   throw err;
            if(book.uploadedBy[0].toString() == req.user._id.toString() ){
                console.log(true);
                book.unlock = true;
            } else {
                book.unlock = false;
            }
            res.render('book-detail-view', {username: req.user.username ,book : book});

        });
    };

    this.loadUpdatePage = function (req,res) {
        Book.findOne({ _id : new mongoose.Types.ObjectId(req.params.bookId) },function (err,book) {
            if (err)   throw err;
            res.render('edit-book', {username: req.user.username ,book : book});
        });
    }

    this.updateBook = function (req,res) {
        Book.findOne({ _id : new mongoose.Types.ObjectId(req.body.bookId) },function (err,book) {
            if (err)   throw err;

            book.subject = req.body.subject;
            book.title = req.body.btitle;
            book.authorsName = req.body.aname;
            book.year = req.body.year;
            book.publisher = req.body.publisher;
            book.description = req.body.description;

            if(req.files['bookCover']) {
                fs.unlinkSync('./uploads/' + book.bookCover);
                book.bookCover = 'bookCover/' + req.files['bookCover'][0].originalname;
            }

            if(req.files['bookFile']) {
                fs.unlinkSync('./uploads/' + book.bookFile);
                book.bookFile = 'bookFile/' + req.files['bookFile'][0].originalname;
            }

            //book.uploadedBy = req.user;

            book.save(function (err, result) {
                if (err)   throw err;
                res.render('home', {username: req.user.username});
            });
        });
    }

    this.deleteBook = function (req,res) {
        Book.findOneAndRemove({ _id : new mongoose.Types.ObjectId(req.params.bookId) }, function (err, user) {
            if (err) {
                return err;
            }
            req.logout();
            res.redirect('/');
        })
    }

};




module.exports = new UserController();
