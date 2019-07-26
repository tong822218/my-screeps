/**
 * 升级者
 * @param {creep} creep 
 */
let Creep = require('creep_Creep')
let constant = require('constant')

class Upgrader extends Creep {

    constructor(creep) {
        super(creep)
    }

    start() {
        if (this.creep.memory.upgrading && this.creep.carry.energy == 0) {
            this.creep.memory.upgrading = false;
            this.creep.say('🔄 harvest');
        }
        if (!this.creep.memory.upgrading && this.creep.carry.energy == this.creep.carryCapacity) {
            this.creep.memory.upgrading = true;
            this.creep.say('⚡ upgrade');
        }

        if (this.creep.memory.upgrading) {
            this.upgrad()
        } else {
            this.withDraw()
        }
    }

    // 从容器获取资源
    withDraw() {
        const bottomContainer = Game.getObjectById(constant.STRUCTURE_CONTAINER_BOTTOM_ID)
        if (this.creep.withdraw(bottomContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(topContainer);
        }
    }

    // 开始升级控制器
    upgrad() {
        if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
}

module.exports = Upgrader;