var buildingCollection = global.nss.db.collection('buildings');
var traceur = require('traceur');
var Building = traceur.require(__dirname + '/building.js');
var Mongo = require('mongodb');

class Room{
  static create(obj, bldg, fn){
    var room = new Room();
    room.name = obj.name;
    room.begin = obj.begin;
    room.end = obj.end;
    room.floorId = Mongo.ObjectID(obj.floorId);
    room.x = parseInt(obj.x);
    room.y = parseInt(obj.y);

    var bldId = Mongo.ObjectID(bldg);

    Building.findById(bldId, bldg=>{
      bldg.rooms.push(room);
      buildingCollection.update({_id:bldg._id}, {$push:{rooms:room}}, ()=> fn(bldg));
      // buildingCollection.save(bldg,()=>{
      //   fn(bldg);
      // });
    });

  }
//i wonder who pissed in his cheerios
// naturally it's not his teaching that's lacking. clearly, it's just the entire room of students. Shame on us for not knowing what he never taught.
//naturally

  // static findAllByUserId(userId, fn){
  //   Base.findAllByUserId(userId, buildingCollection, Building, fn);
  // }

  // static findById(id, fn){
  //   Base.findById(id, buildingCollection, Building, fn);
  // }
}

module.exports = Room;