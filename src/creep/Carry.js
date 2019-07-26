/**
 * 运送者
 * @param {creep} creep 
 */

let Creep = require('creep_Creep')
let constant = require('constant')

class Carry extends Creep {
    constructor(creep) {
        super(creep)
    }

    start() {
        if (this.creep.memory.carrying && this.creep.carry.energy == 0) {
            this.creep.memory.carrying = false;
            this.creep.say('🔄 go harvest');
        }
        if (!this.creep.memory.carrying && this.creep.carry.energy == this.creep.carryCapacity) {
            this.creep.memory.carrying = true;
            this.creep.say('⚡ go carrying');
        }

        if (!this.creep.memory.carrying) {
            this.withDraw()
        } else {
            this.transfer()
        }

    }

    /**
     * 从目标处获取资源没有目标就从顶部container中获取
     */
    withDraw(target) {
        if (target) {
            if (this.creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
            }
            return
        }

        const topContainer = Game.getObjectById(constant.STRUCTURE_CONTAINER_TOP_ID)
        if (topContainer.store[RESOURCE_ENERGY] > 0) {
            if (this.creep.withdraw(topContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(topContainer);
            }
            return
        }

        var storage = Game.getObjectById(constant.STRUCTURE_STORAGE)
        if (storage) {
            if (this.creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(storage);
            }
        }

    }

    /**
     * 将能量运输到目标
     */
    transfer(target) {
        // 传入了目标，就优先给目标输送能量
        if (target) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return
        }
        // spawn和container不满，给它们先灌满
        var targets = this.getNotFullEnergySpawnAndContainer()
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return
        }

        // 检查塔是否需要能量
        targets = this.getNotFullEnergyTower()
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }
            return
        }

        // spwan和extension，tower都满了，就放到container中（不包括最顶部的container）
        var container = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity &&
                    structure.id != constant.STRUCTURE_CONTAINER_TOP_ID
            }
        });
        if (container.length > 0) {
            if (this.isInTargetPostion(container[0])) {
                this.creep.drop(RESOURCE_ENERGY);
            } else {
                this.moveTo(container[0])
            }
            return
        }

        // 如果container也满了就放到storage
        var storage = Game.getObjectById(constant.STRUCTURE_STORAGE)
        if (storage) {
            if (this.creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(storage, {
                    visualizePathStyle: {
                        stroke: '#ffff00'
                    }
                });
            }

        }


    }


    /**
     * distance: 查找的范围，默认3个距离
     */
    pickup(distance = 3) {
        const targets = this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, distance);
        if (targets.length > 0) {
            if (this.creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0]);
            }
        }
    }

    // 获取房间内不满血的建筑
    getNotFullEnergySpawnAndContainer() {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        return targets
    }

    getNotFullEnergyTower() {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.memory.needEnergy)
            }
        });
        return targets
    }

}


module.exports = Carry;