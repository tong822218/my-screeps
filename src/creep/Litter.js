/**
 * 能量不够时，临时制造出来过渡用的creep
 * @param {creep} creep 
 */
let Creep = require('creep_Creep')
let constant = require('constant')

class Litter extends Creep {

    constructor(creep) {
        super(creep)
    }

    start() {
        
        // txtension spawn 满了直接到固定点等候
        var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length <=0 ){
            this.creep.moveTo(18,12)
            return
        }

        if (this.creep.memory.transporting && this.creep.carry.energy == 0) {
            this.creep.memory.transporting = false;
            this.creep.say('🔄 harvest');
        }
        if (!this.creep.memory.transporting && this.creep.carry.energy == this.creep.carryCapacity) {
            this.creep.memory.transporting = true;
            this.creep.say('⚡ transport');
        }

        if (!this.creep.memory.transporting) { // 如果爬虫身上能量不满，就去获取能量
            this.withDraw()

        } else {
            this.fillEnergy()
        }
    }

    // 从容器获取资源
    withDraw() {
        var container = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0
            }
        });

        if (container && this.creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(container, {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        } else {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }
        }
    }

    fillEnergy() {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return
        }



        targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER &&
                    structure.memory.needEnery
            }
        });
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
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
                    structure.pos.x != constant.STRUCTURE_CONTAINER_TOP_POSITION[0]
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

}

module.exports = Litter;