/* global describe, it, before, beforeEach*/
/* jshint expr:true */


'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
//var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var app = require('../../../app/app');
var request = require('supertest');
//var cp = require('child_process');

var User;

describe('buildings', function(){

	before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      factory('user', function(users){
      	factory('location', function(locations){
        	done();
      	});
      });
    });
  });

	describe('Authentication', function(){
		var cookie;

		beforeEach(function(done){
			request(app)
			.post('/login')
			.send('email=sue@aol.com')
			.send('password=5678')
			.end(function(err, res){
				var cookies = res.headers['set-cookie'];
				var cookie1 = cookies[0].split(' ');
				var cookie2 = cookies[1].split(' ');
				cookie = cookie1[0].concat(' '+cookie2[0]);
				done();
			});
		});

		describe('GET /buildings/new', function(){
			it('should show the new buildings web page', function(done){
				request(app)
				.get('/buildings/new')
				.set('cookie', cookie)
				.end(function(err, res){
					expect(res.status).to.equal(200);
					expect(res.text).to.include('sue@aol.com');
					done();
				});
			});

			it('should NOT show the new buildings web page - not logged in', function(done){
				request(app)
				.get('/buildings/new')
				.end(function(err, res){
					expect(res.status).to.equal(302);
					expect(res.headers.location).to.equal('/');
					done();
				});
			});
		});

		describe('POST /buildings', function(){
			it('should take user to building view page', function(done){
				request(app)
				.post('/buildings')
				.set('cookie', cookie)
				.send({_id:'c123456789abcdef01234542', name:'House of lurve', x: 4, y:2, locationId:'a123456789abcdef01234568', userId:'0123456789abcdef01234568'})
				.end(function(err, res){
					expect(res.status).to.equal(302);
					expect(res.headers.location).to.equal('/buildings/c123456789abcdef01234542');
					done();
				});
			});

			it('should NOT create a new building - not logged in', function(done){
				request(app)
				.post('/buildings')
				.end(function(err, res){
					expect(res.status).to.equal(302);
					expect(res.headers.location).to.equal('/');
					done();
				});
			});
		});

		describe('GET /buildings/c123456789abcdef01234542', function(){
			it('should show building', function(done){
				request(app)
				.get('/buildings/c123456789abcdef01234542')
				.set('cookie', cookie)
				.end(function(err, res){
					expect(res.status).to.equal(200);
					expect(res.text).to.include('688.88');
					//expect(res.headers.location).to.equal('/buildings/c123456789abcdef01234542');
					done();
				});
			});
		});

	});
});// end describe buildings