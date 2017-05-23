var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', passport.authenticationMiddleware(),function(req, res) {
  res.render('home', { username: req.user.username });
});




module.exports = router;
