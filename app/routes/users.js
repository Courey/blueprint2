'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.loadLogin = (req, res)=>{
	res.render('users/login', {title: 'Login'});
};

exports.register = (req, res)=>{
	User.create(req.body, user=>{
		if(user){
			req.session.userId = user._id;
			res.redirect('/');
		}
		else{
			res.redirect('/login');
		}	
	});
};

exports.login = (req, res)=>{
	User.login(req.body, user=>{
		if(user){
			req.session.userId = user._id;
			res.redirect('/');
		}
		else{
			res.redirect('/login');
		}	
	});
};

exports.logout = (req, res)=>{
	req.session = null;
	res.redirect('/');
};

exports.bounce = (req, res, next)=>{
	User.findById(req.session.userId, user=>{
		if(user){
			res.locals.user = user;
			next();
		}else{
			res.redirect('/');
		}
	});
};