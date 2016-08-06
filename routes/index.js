var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    var name = req.user.local.firstName ;
    if(!name){
      name = req.user.facebook.name;
    }
  } else {
    var name = "";
  }
  res.render('home', {name: name});
});

router.get('/stock', function(req, res, next){
  res.render('stock_show');
})

module.exports = router;
