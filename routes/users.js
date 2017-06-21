var express = require('express');
var router = express.Router();
var ControllerMap = require('../controllers/controllersMap');
var UserController = ControllerMap.UserController;
var passport = require('passport');
var multer  = require('multer');





/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});



router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});
});

router.get('/log-out', function (req, res) {
    req.logout();
    res.redirect('/');

});

router.post('/trigger-login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/trigger-logout', function (req, res) {
    UserController.logOut(req, res);
});

router.get('/register', function (req, res) {
    res.render('register', {title: 'Register'});
});

router.get('/profile', passport.authenticationMiddleware(), function (req, res) {
    res.render('profile', { username: req.user.username, user : req.user });
});

router.post('/update-user', passport.authenticationMiddleware(), function (req, res) {
    UserController.updateUser(req,res);
});


router.get('/delete-user', passport.authenticationMiddleware(), function (req, res) {
    UserController.deleteUser(req,res);
});

router.post('/save-new-user', passport.authenticate('sign_up', {
    successRedirect: '/',
    failureRedirect: 'users/register',
    failureFlash: true
}));

router.get('/add-book', passport.authenticationMiddleware(), function (req, res) {
    res.render('add-book', { username: req.user.username, user : req.user });
});

router.get('/get-all-books', passport.authenticationMiddleware(), function (req, res) {
    UserController.getAllBooks(req, res);
});

router.get('/get-a-book/:bookId', passport.authenticationMiddleware(), function (req, res) {
    UserController.getABook(req, res);
});

router.get('/delete-a-book/:bookId', passport.authenticationMiddleware(), function (req, res) {
    UserController.deleteBook(req, res);
});

router.get('/get-a-book-update/:bookId', passport.authenticationMiddleware(), function (req, res) {
    UserController.loadUpdatePage(req, res);
});

router.post('/insert-book', passport.authenticationMiddleware(), multer.upload.fields([{ name: 'bookCover', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]),function (req, res) {
    UserController.insertBook(req,res);
});

router.post('/update-book', passport.authenticationMiddleware(), multer.upload.fields([{ name: 'bookCover', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]),function (req, res) {
    UserController.updateBook(req,res);
});


module.exports = router;
