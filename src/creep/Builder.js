/**
 * 建造者
 * @param {creep} creep 
 */
let Creep = require('creep_Creep')

class Builder extends Creep {

    constructor(creep) {
        super(creep)
    }

    start() {
        if (this.creep.memory.building && this.creep.carry.energy == 0) {
            this.creep.memory.building = false;
            this.creep.say('🔄 harvest');
        }
        if (!this.creep.memory.building && this.creep.carry.energy == this.creep.carryCapacity) {
            this.creep.memory.building = true;
            this.creep.say('🚧 build');
        }

        if (this.creep.memory.building) {
            this.build()
        } else {
            this.withDraw()
        }
    }

    // 从容器获取资源
    withDraw() {
        var storage = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0
            }
        });

        if (storage && this.creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(storage, {
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

    // 开始升级控制器
    build() {
        var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
            return
        }

        targets = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (st) {
                return st.structureType == STRUCTURE_WALL && st.hits < 100000
            }

        })
        if(targets){
            this.creep.repair(targets)
        }

    }
}
module.exports = Builder;