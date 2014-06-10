/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var Room;
//var Building;

describe('User', function(){
  before(function(done){
    db(function(){
      Room = traceur.require(__dirname + '/../../../app/models/room.js');
      //Building = traceur.require(__dirname + '/../../../app/models/building.js');

      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('buildings').drop(function(){
      factory('building', function(buildings){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a room', function(done){
      Room.create({name:'Living Room', begin:{x:2,y:2}, end:{x:6,y:6}, floorId: '53726b19fb92627b18597a6d'}, 'c123456789abcdef0123456b', function(build){
        expect(build.rooms[0]).to.be.instanceof(Room);
        expect(build.rooms[0].name).to.equal('Living Room');
        expect(build.rooms[0].begin.x).to.equal(2);
        expect(build.rooms[0].begin.y).to.equal(2);
        expect(build.rooms[0].end.x).to.equal(6);
        expect(build.rooms[0].end.y).to.equal(6);
        expect(build.rooms[0].floorId).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
//You all right dude? I'll live. I'm just not terribly thrilled with this day. And the shitty thing is, I don't even have friends so I can't even go vent to someone after the day is done.
//Yeah, you do. You have some in this class. I know you do. I'll be your friend. thanks dude. Chyld's shittines isn't even worth venting about though. Yeah, I wonder what in the fuck is going on with him today.
});
