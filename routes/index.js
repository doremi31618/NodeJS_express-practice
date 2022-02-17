var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog/index')
});
router.get('/me', (req, res)=>{
  // console.log(req.user);
  res.render('profile', {title: 'Profile', user: req.user});
})

module.exports = router;
