/**
 * 升级者
 * @param {creep} creep 
 */
let Creep = require('Creep')
let Constant = require('constants')

class Upgrader extends Creep {

    constructor(creep) {
        super(creep)
    }

    start() {
        if (this.creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            this.upgrad()
        } else {
            this.withDraw()
        }
    }

    // 从容器获取资源
    withDraw() {
        const bottomContainer = Game.getObjectById(Constant.STRUCTURE_CONTAINER_BOTTOM_ID)
        if (this.creep.withdraw(bottomContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(topContainer);
        }
    }

    // 开始升级控制器
    upgrad() {
        if (creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}

module.exports = Upgrader;