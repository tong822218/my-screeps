var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttack = require('role.attack');
var clearMemory = require('helper.clear_memory');
var Tower = require('Tower');

module.exports.loop = function () {

    // 清理内存中死掉的creep
    clearMemory()
    // Tower 控制
    const towers = Game.rooms['W3N29'].find(FIND_STRUCTURES, {
        filter: (st) => st.structureType == STRUCTURE_TOWER
    })
    if (towers.length > 0) {
        for (let t in towers) {
            var tower = towers[t];
            const myTower = new Tower(tower)
            myTower.init()
        }
    }

    // let attackList = _.filter(Game.creeps, (item) => item.memory.role == 'attack')
    let harvestList = _.filter(Game.creeps, (item) => item.memory.role == 'harvester')
    let upgraderList = _.filter(Game.creeps, (item) => item.memory.role == 'upgrader')
    let builderList = _.filter(Game.creeps, (item) => item.memory.role == 'builder')

    // if (attackList.lqwerength < 1) {
    //     Game.spawns['Spawn1'].spawnCreep([ATTACK, WORK, CARRY, MOVE, MOVE], 'attack' + Game.time, {
    //         memory: {
    //             role: 'attack'
    //         }
    //     })
    // }

    if (harvestList.length < 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE,MOVE], 'harvester' + Game.time, {
            memory: {
                role: 'harvester'
            }
        })
    }
    if (upgraderList.length < 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY,CARRY,MOVE, MOVE], 'upgrader' + Game.time, {
            memory: {
                role: 'upgrader'
            }
        })
    }
    if (builderList.length < 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'builder' + Game.time, {
            memory: {
                role: 'builder'
            }
        })
    }


    for (var name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'attack') {
            roleAttack.run(creep)
        }
    }
}