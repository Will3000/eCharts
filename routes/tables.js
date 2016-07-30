var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({ name:{}, table_data: {} });
var Table = mongoose.model('Table', tableSchema);
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
	return next();
	res.redirect('/');
}


// GET new table page.
router.get("/new", isAuthenticated,function(req, res){
	var tables, names = {};
	if(req.user.table_id){
		tables = req.user.table_id;
	}

	res.render("tables/new", {errors: {}, tables: tables})
});

// Save new table into database
router.post("/new", function(req, res){
	if(req.isAuthenticated() === false){
		res.send({errors: "Please Log In First"});
	}
	var table = new Table({ name: req.body.name, table_data: req.body.body});
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

// Table index page
router.get("/", function(req, res){
	User.findById(req.user.id, function(err, user) {
		if(err){
			err.status = 404;
			res.send({errors: err.errors});
		} else {
			user.save(function(){
				res.send({table_id: user.table_id});
			})
		}
	});
})

// Table show page
router.get("/:id", function(req, res){
	Table.findById(req.params.id, function(err, table){
		if(err){
			err.status = 404;
			res.redirect("/");
		} else {
			res.render("tables/show", {table_name: table.name, table_data: table.table_data})
		}
	})
})

// Patch table action
router.patch("/:id", function(req, res, next){
	Table.findOne({id: req.params.id},
		function(err, table){
			if(err){
				err.status = 404;
				res.send('Failed');
			} else {
				// table.name=req.body.name;
				// table.body=req.body.body;
				res.send('Okay');
			}
		}
	)
})
module.exports = router;
