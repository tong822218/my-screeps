var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttack = require('role.attack');

module.exports.loop = function () {
    
    // var tower = Game.getObjectById('62ef2691248d6ffcd766d5a7');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
   
      let attackList = _.filter(Game.creeps,(item)=>item.memory.role=='attack')
      let harvestList = _.filter(Game.creeps,(item)=>item.memory.role=='harvester')
      let upgraderList = _.filter(Game.creeps,(item)=>item.memory.role=='upgrader')
      let builderList = _.filter(Game.creeps,(item)=>item.memory.role=='builder')
      
      if(attackList.length < 1){
        Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE],'attack'+Game.time,{memory:{role:'attack'}})
      }
      
      if(harvestList.length < 2){
          Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE],'harvester'+Game.time,{memory:{role:'harvester'}})
      }
      if(upgraderList.length < 1){
          Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE],'upgrader'+Game.time,{memory:{role:'upgrader'}})
      }
      if(builderList.length < 1){
          Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE],'builder'+Game.time,{memory:{role:'builder'}})
      }
      

    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role=='attack'){
            roleAttack.run(creep)
        }
    }
}