/**
 * Created by namila on 5/20/17.
 */

var Modules = require('../models/ModelsMap');
var User = Modules.User;
var passport = require('passport');
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
};



module.exports = new UserController();
