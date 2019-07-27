/**
 * creep管理类
 */
let constant = require('constant')

let Harvester = require('creep_Harvester')
let Carry = require('creep_Carry')
let Upgrader = require('creep_Upgrader')
let Builder = require('creep_Builder')
let Litter = require('creep_Litter')

var CreepManage = {

  // 所有creep按类别存放
  creeps: {

  },
  spawn: Game.spawns['Spawn1'],
  room: Game.rooms['W3N29'],
  // 当前需要的creep的数量
  maxAmount: {
    harvester: 1,
    carry: 1,
    builder: 1,
    upgrader: 1,
    litter: 2
  },

  // 初始化函数
  start: function () {
    this.classify() // creep初始化并分组
    this.startWorkStream()
  },

  // 开始工作流程
  startWorkStream() {
    // this.spawnBuilder()
    // this.spawnUpgrader()
    // this.spawnHarvester()
    this.spawnCarry()
  },

  spawnHarvester() {
    if (!this.creeps[constant.CREEP_TYPE_HARVESTER] || this.creeps[constant.CREEP_TYPE_HARVESTER].length < this.maxAmount.harvester) {
      const source = Game.getObjectById(constant.STRUCTURE_SOURCE_TOP_ID)
      const topContainer = Game.getObjectById(constant.STRUCTURE_CONTAINER_TOP_ID)
      if (source.energy > 0 &&
        topContainer.store[RESOURCE_ENERGY] < topContainer.storeCapacity) {

        // 如果能生產大的就生产打的，能量不够并且没有harvester了就生产小的临时用
        if (this.spawnCreep('harvester' + Game.time, constant.CREEP_TYPE_HARVESTER, {
            dryRun: true
          })) {
          this.spawnCreep('harvester' + Game.time, constant.CREEP_TYPE_HARVESTER)
        } else if (!this.creeps[constant.CREEP_TYPE_HARVESTER] || 
          this.creeps[constant.CREEP_TYPE_HARVESTER].length == 0) {
            this.spawnLitter()
        }
      }
    }
  },
  spawnCarry() {
    if (!this.creeps[constant.CREEP_TYPE_CARRY] || this.creeps[constant.CREEP_TYPE_CARRY].length < this.maxAmount.carry) {
      // 如果能生產大的就生产打的，能量不够并且没有carry了就生产小的临时用
      if (this.spawnCreep('carry' + Game.time, constant.CREEP_TYPE_CARRY, {
          dryRun: true
        })) {
        this.spawnCreep('carry' + Game.time, constant.CREEP_TYPE_CARRY)
      } else if (!this.creeps[constant.CREEP_TYPE_CARRY] || this.creeps[constant.CREEP_TYPE_CARRY].length == 0) {
        this.spawnLitter()
      }
    }

  },
  spawnBuilder() {
    if (!this.creeps[constant.CREEP_TYPE_BUILDER] || this.creeps[constant.CREEP_TYPE_BUILDER].length < this.maxAmount.builder) {
      var targets = this.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        this.spawnCreep('builder' + Game.time, constant.CREEP_TYPE_BUILDER)
      }
    }

  },
  spawnUpgrader() {
    if (!this.creeps[constant.CREEP_TYPE_UPGRADER] || this.creeps[constant.CREEP_TYPE_UPGRADER].length < this.maxAmount.upgrader) {
      this.spawnCreep('upgrader' + Game.time, constant.CREEP_TYPE_UPGRADER)
    }
  },

  // 生产火种creep
  spawnLitter(){
    if(!this.creeps[constant.CREEP_TYPE_LITTER] || this.creeps[constant.CREEP_TYPE_LITTER].length < this.maxAmount.litter){
      this.spawnCreep('litter' + Game.time, constant.CREEP_TYPE_LITTER)
    }
  },

  // 产卵
  spawnCreep(name, role, option) {
    option = option || {}
    let body = this.getBodyByRole(role)
    console.log(body);

    const a = this.spawn.spawnCreep(body, name || (role + Game.time), {
      ...option,
      memory: {
        role: role
      }
    })
    console.log(a);


  },

  // 根据creep权限获取body
  getBodyByRole(role) {
    let body = constant.CREEP_BODY_NO_ENERGY
    switch (role) {
      case constant.CREEP_TYPE_HARVESTER:
        body = constant.CREEP_BODY_HARVESTER
        break;
      case constant.CREEP_TYPE_CARRY:
        body = constant.CREEP_BODY_CARRY
        break;
      case constant.CREEP_TYPE_UPGRADER:
        body = constant.CREEP_BODY_UPGRADER
        break;
      case constant.CREEP_TYPE_BUILDER:
        body = constant.CREEP_BODY_BUILDER
        break;
      case constant.CREEP_TYPE_LITTER:
        body = constant.CREEP_BODY_NO_ENERGY
        break;
      default:
        break;
    }
    return body
  },
  // 将creep分类存放到数组
  classify() {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      let mycreep
      if (creep.memory.role == constant.CREEP_TYPE_HARVESTER) {
        mycreep = new Harvester(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_UPGRADER) {
        mycreep = new Upgrader(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_BUILDER) {
        mycreep = new Builder(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_CARRY) {
        mycreep = new Carry(creep)
      }
      if (creep.memory.role == constant.CREEP_TYPE_LITTER) {
        mycreep = new Litter(creep)
      }
      if (mycreep) {
        mycreep.start()
        const role = mycreep.getRole()
        if (this.creeps[role]) {
          this.creeps[role].push(creep)
        } else {
          this.creeps[role] = [creep]
        }
      }
    }

  }
}


module.exports = CreepManage;