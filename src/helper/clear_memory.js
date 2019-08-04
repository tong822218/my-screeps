module.exports = function () {
  // clear memory
  if (Game.time % 1000 == 0) {
      for( var i in Memory.creeps) {
          if (!Game.creeps[i]) {
                delete Memory.creeps[i];
          }
      }
  }
}