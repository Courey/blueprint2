// var buildingCollection = global.nss.db.collection('buildings');
// var traceur = require('traceur');
// var Building = traceur.require(__dirname + '/building.js');
// var Mongo = require('mongodb');

// class Room{
//   static create(obj, bldg, fn){
//     var room = new Room();
//     room.name = obj.name;
//     room.beginX = obj.beginX;
//     room.endX = obj.endX;
//     room.floorId = Mongo.ObjectID(obj.floorId);
//     room.beginY = parseInt(obj.beginY);
//     room.endY = parseInt(obj.endY);

//     var bldId = Mongo.ObjectID(bldg);

//     Building.findById(bldId, bldg=>{
//       bldg.rooms.push(room);
//       buildingCollection.update({_id:bldg._id}, {$push:{rooms:room}}, ()=> fn(bldg));
//       // buildingCollection.save(bldg,()=>{
//       //   fn(bldg);
//       // });
//     });


//   }

//   // static findById(id, fn){
//   //   Base.findById(id, buildingCollection, Building, fn);
//   // }
// }

// module.exports = Room;
var Mongo = require('mongodb');

class Room{
  constructor(obj){
    this.name = obj.name;
    this.begin = {x:obj.beginX*1, y:obj.beginY*1};
    this.end = {x:obj.endX*1, y:obj.endY*1};
    this.floorId = Mongo.ObjectID(obj.floorId);
  }
}

module.exports = Room;