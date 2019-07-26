/**
 * creep管理类
 */
let constant = require('constant')

let Harvester = require('creep_Harvester')
let Carry = require('creep_Carry')
let Upgrader = require('creep_Upgrader')
let Builder = require('creep_Builder')
var CreepManage = {

  creeps: {},  // 所有creep按类别存放
  
  start: function () {
    for (var name in Game.creeps) {

      var creep = Game.creeps[name];
      let mycreep

      if (creep.memory.role == constant.CREEP_TYPE_HARVESTER) {
        mycreep = Harvester(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_UPGRADER) {
        mycreep = Upgrader(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_BUILDER) {
        mycreep = Builder(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_CARRY) {
        mycreep = Carry(creep)
      }
      mycreep.start()
      this.classify(mycreep)
    }

  },
  spawnCreep(spawn,name,role){
    let body = []
    Game.spawns[spawn].spawnCreep(body, 'harvester' + Game.time, {
      memory: {
          role: role
      }
  })

  },
  // 将creep分类存放到数组
  classify(mycreep) {
    const role = mycreep.getRole()
    if (this.creeps[role]) {
      this.creeps[role].push(creep)
    } else {
      this.creeps[role] = [creep]
    }
  }
}


module.exports = CreepManage;