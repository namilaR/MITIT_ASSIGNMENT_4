/**
 * Created by namila on 5/20/17.
 */

var Modules = require('../models/ModelsMap');
var User = Modules.User;
var Book = Modules.Book;
var passport = require('passport');
var multiparty = require('multiparty');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;



UserController = function () {
    this.updateUser = function (req,res) {
        User.findOne({username:req.body.username},function (err,user) {
            if(err) {
                return err;
            }
            if(user.validPassword(req.body.oldpassword)){
                user.fname = req.body.fname;
                user.lname = req.body.lname;
                user.password = user.encryptPassword(req.body.password);

                user.save(function (err,result) {
                    if (err)   throw err;
                    res.render('home', { username: req.user.username });
                });

            } else {
                req.flash('error', 'old password is incorrect');
                res.render('profile', { username: req.user.username , user : req.user });
            }

        })
    }

    this.deleteUser = function (req,res) {
        User.findOneAndRemove({username:req.user.username },function (err,user) {
            if(err) {
                return err;
            }
            req.logout();
            res.redirect('/');
        })
    }
    
    this.insertBook  = function (req,res) {
        console.log(req.body);

        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if (err)   throw err;

            var newBook  = Book();
            newBook.subject = fields.subject;
            newBook.title = fields.btitle;
            newBook.authorsName = fields.aname;
            newBook.year = fields.year;
            newBook.publisher = fields.publisher;
            newBook.qty = fields.qty;


            newBook.save(function (err,result) {
                if (err)   throw err;
                res.render('home', { username: req.user.username });
            });



        });


    }
};



module.exports = new UserController();
