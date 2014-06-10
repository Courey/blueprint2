/*jshint unused:false*/
'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Location = traceur.require(__dirname + '/../models/location.js');
var Building = traceur.require(__dirname + '/../models/building.js');
var Floor = traceur.require(__dirname + '/../models/floor.js');


exports.new = (req, res)=>{
	console.log('DO YOU HAVE A COOKIE?!?');
	console.log(req.session.userId);
	if(req.session.userId){
		User.findById(req.session.userId, user=>{
			Location.findAll(locations=>{
				res.render('buildings/new', {user:user, locations: locations});
			});
		});
	}else{
		res.redirect('/');
	}
};

exports.create = (req, res)=>{
	Building.create(req.body, bldg=>{
		res.redirect(`/buildings/${bldg._id.toString()}`);
	});
};

exports.show = (req, res)=>{
	Floor.findAll(floors=>{
		Building.findById(req.params.id, bldg=>{
		console.log(bldg);
		Location.findById(bldg.locationId, loc=>{
			console.log(loc);
			var totalCost = (bldg.x * 1) * (bldg.y * 1) * (loc.rate * 1);
			res.render('buildings/show', {floors: floors, building: bldg, location:loc, total: totalCost});
		});
	});
	});
	
};