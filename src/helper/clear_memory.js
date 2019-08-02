module.exports = function (creep, ramparts) {
  // clear memory
  if (Game.time % 10 == 0) {
      for( var i in Memory.creeps) {
          if (!Game.creeps[i]) {
                delete Memory.creeps[i];
          } else {
              //delete Memory.creeps[i];
          }
      }
  }
}