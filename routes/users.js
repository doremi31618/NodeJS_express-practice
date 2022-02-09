var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('messages',{
    title: "Eric",
    message: "nice to meet you"
  });
});

router.get('/:userId', (req, res)=>{
  res.render('index', {
    title: "Hello",
    message: "this is message"
  });
});



module.exports = router;
