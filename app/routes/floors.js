'use strict';

var traceur = require('traceur');
var Floor = traceur.require(__dirname +'/../models/floor.js');
var floors = global.nss.db.collection('floors');
var multiparty = require('multiparty');


exports.new = (req,res)=>{
	res.render('floors/new');
};

exports.create = (req, res)=>{
	var form = new multiparty.Form();
	form.parse(req, (err, fields, files)=>{
		console.log(err);
		console.log(fields);
		fields.photo = files.photo;
		Floor.create(fields, ()=>{
			res.redirect('/floors');
		});
	});
};

exports.index = (req, res)=>{
	console.log('YOU ARE HERE');
	floors.find().toArray((err, floor)=>{
		console.log(floor);
 		res.render('floors/index', {floors: floor});
	});
};