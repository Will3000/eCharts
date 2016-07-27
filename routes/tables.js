var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({ table_data: {} });
var Table = mongoose.model('Table', tableSchema);
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}


/* GET new table page. */
router.get("/new", isAuthenticated,function(req, res){
  res.render("tables/new", {errors: {}, table:{}})
});

router.post("/new", function(req, res){
  if(req.isAuthenticated() === false){
    res.send({errors: "Please Log In First"});
  }
  var table = new Table({ table_data: req.body});
  table.save(function(err, table){
    if(err){
      console.log(err);
      res.send({
        errors: err.errors,
        table_data: req.body
      });
    } else {
      User.findById(req.user.id, function(err, user) {
        console.log('------------------>' + user);
        if(err){
          err.status = 404;
          res.send({errors: err.errors});
        } else {
          user.table_id.push(table.id);
          user.save(function(){
            res.send({message: "New Table is Created!"});
          })
        }
      });
    }
  });
});

router.get("/:id", function(req, res){
	Table.findById(req.params.id, function(err, table){
		if(err){
			err.status = 404;
			res.redirect("/");
		} else {
			res.render("tables/show", {table: table.table_data.body})
		}
	})
})
module.exports = router;
