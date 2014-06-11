var buildingCollection = global.nss.db.collection('buildings');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var Mongo = require('mongodb');
var async = require('async');
var Floor = traceur.require(__dirname + '/floor.js');
var Location = traceur.require(__dirname + '/location.js');
var Room = traceur.require(__dirname + '/room.js');



class Building{
  static create(obj, fn){
    var building = new Building();
    building._id = Mongo.ObjectID(obj._id);
    building.name = obj.name;
    building.x = parseInt(obj.x);
    building.y = parseInt(obj.y);
    building.rooms = [];
    building.locationId = Mongo.ObjectID(obj.locationId);
    building.userId = Mongo.ObjectID(obj.userId);
    buildingCollection.save(building, ()=>fn(building));
  }

  static findAllByUserId(userId, fn){
    Base.findAllByUserId(userId, buildingCollection, Building, fn);
  }

  static findById(id, fn){
    Base.findById(id, buildingCollection, Building, fn);
  }

  addRoom(obj, func){
    var room = new Room(obj);
    this.rooms.push(room);
    buildingCollection.update({_id: this._id}, {$push:{rooms:room}}, ()=> func(this));
  }

  totalCost(func){
    Location.findById(this.location, location=>{
      var cost = (this.x * 1) * (this.y * 1) * (location.rate * 1);

      async.map(this.rooms, tallyRoomCost, (err, result)=>{
        cost+= result.reduce((accum, room)=>{
          var x = room.endX -room.beginX +1;
          var y = room.endY - room.beginY +1;
          var sqFt = x * y;
          return sqFt * room.floor.rate;
        }, 0);
        func(cost);
      });
    });
  }




}

function tallyRoomCost(room, func){
  'use strict';
  Floor.findById(room.floorId, floor=>{
    room.floor = floor;
    func(null, room);
  });
} 

module.exports = Building;
