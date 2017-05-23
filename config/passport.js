/**
 * Created by namila on 5/22/17.
 */

var passport = require('passport');
var Modules = require('../models/ModelsMap');
var User = Modules.User;
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },

    function (req, email, password, done) {

        User.findOne({'email': email},

            function (err, user) { // In case of any error, return using the done method

                console.log('email -- ' + email);
                console.log('email -- ' + password);

                if (err)
                    return done(err);

                if (!user) {
                    console.log('User Not Found with username ' + email);
                    return done(null, false,req.flash('message', 'User Not found.'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            }
        );
    })
);


passport.use('sign_up', new LocalStrategy({
    userNameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({email: 'email'}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, {message: "Email already exist"});
        }

        var newUser = new User();
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(password);
        newUser.fname = req.body.fname;
        newUser.lname = req.body.lname;
        newUser.username = req.body.username;

        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }

            return done(null, newUser);
        })
    })
}));

passport.authenticationMiddleware = function () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/users/login')
    }
}
