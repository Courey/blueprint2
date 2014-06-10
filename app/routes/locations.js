'use strict';

var traceur = require('traceur');
var Location = traceur.require(__dirname +'/../models/location.js');
var locations = global.nss.db.collection('locations');


exports.new = (req,res)=>{
	res.render('locations/new');
};

exports.create = (req, res)=>{
	Location.create(req.body, ()=>{
		res.redirect('/locations');
	});
};

exports.index = (req, res)=>{
	locations.find().toArray((err, loc)=>{
 		res.render('locations/index', {locations: loc});
	});
};