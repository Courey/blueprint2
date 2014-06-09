/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var User;
var Location;
var Building;

describe('User', function(){
  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      Building = traceur.require(__dirname + '/../../../app/models/building.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('locations').drop(function(){
        global.nss.db.collection('buildings').drop(function(){

          factory('user', function(users){
            factory('location', function(locations){
              factory('building', function(buildings){
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('.create', function(){
    it('should create a building', function(done){
      Building.create({name:'moonbase', x:'100', y:'200', locationId:'a123456789abcdef01234567', userId:'0123456789abcdef01234567'}, function(building){
        expect(building).to.be.instanceof(Building);
        expect(building._id).to.be.instanceof(Mongo.ObjectID);
        expect(building.name).to.equal('moonbase');
        expect(building.x).to.deep.equal(100);
        expect(building.y).to.deep.equal(200);
        expect(building.locationId).to.deep.equal(Mongo.ObjectID('a123456789abcdef01234567'));
        expect(building.userId).to.deep.equal(Mongo.ObjectID('0123456789abcdef01234567'));
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find buildings by user id', function(done){
      Building.findAllByUserId('0123456789abcdef01234568', function(buildings){
        expect(buildings).to.have.length(3);
        expect(buildings[0]).to.be.instanceof(Building);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a building', function(done){
      Building.findById('c123456789abcdef01234567', function(building){
        expect(building).to.be.instanceof(Building);
        expect(building.name).to.equal('castle');
        done();
      });
    });
  });

});
