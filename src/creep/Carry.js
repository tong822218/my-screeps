/**
 * 运送者
 * @param {creep} creep 
 */

let Creep = require('creep_Creep')
let constant = require('constant')
let find = require('helper_find')

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
     * 从容器中获取能量
     */
    withDraw() {

        this.pickup() // 如果附近地上有能量就捡起来

        // 如果spawn或者extension不满从最近的能量存储处获取能量
        const spawnOrExtension = this.getNotFullEnergySpawnAndExtension()
        if (spawnOrExtension) {
            let targ = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (st) {
                    return (st.structureType == STRUCTURE_CONTAINER ||
                            st.structureType == STRUCTURE_STORAGE) &&
                        st.store[RESOURCE_ENERGY] > 0
                }
            })
            if (this.creep.withdraw(targ, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targ);
            }
            return
        }

        const topContainer = find.topContainer(constant.ROOM1)
        if (topContainer && topContainer.store[RESOURCE_ENERGY] > 0) {
            if (this.creep.withdraw(topContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(topContainer);
            }
            return
        }

        // var storage = Game.getObjectById(constant.STRUCTURE_STORAGE_ID)
        // if (storage) {
        //     if (this.creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         this.creep.moveTo(storage);
        //     }
        // }

    }

    /**
     * 将能量运输到目标
     */
    transfer() {

        // spawn和extension不满，给它们先灌满
        var targets = this.getNotFullEnergySpawnAndExtension()
        if (targets) {
            if (this.creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets, {
                    visualizePathStyle: {
                        stroke: '#ff0000'
                    }
                });
            }
            return
        }

        // 检查塔是否需要能量
        targets = this.getNeedEnergyTower()
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ff0000'
                    }
                });
            }
            return
        }

        /**
         *  spwan和extension，tower都满了，就放到container中（
         *  不包括最顶部的container,底部container小于1/5时再添加,从carryTaskQueue中取任务）
         * */
        for (const id in Memory.taskQueue) {
            const memory = Memory.taskQueue[id];
            if (memory.needEnergy) {
                const container = Game.getObjectById(id)
                if(this.creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(container, {
                        visualizePathStyle: {
                            stroke: '#ff0000'
                        }
                    });
                }
                return
            }
        }
        // targets = this.getNeedEnergyContainer()
        // if (targets.length > 0) {
        //     if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         this.creep.moveTo(targets[0], {
        //             visualizePathStyle: {
        //                 stroke: '#ff0000'
        //             }
        //         });
        //     }
        //     return
        // }

        // 如果container也满了就放到storage
        targets = this.getNeedEnergyStorage()
        if (targets) {
            if (this.creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets, {
                    visualizePathStyle: {
                        stroke: '#ff0000'
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

    // 获取房间内不满血的spawn 和 extension
    getNotFullEnergySpawnAndExtension() {
        var targets = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        
        return targets
    }

    getNeedEnergyTower() {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.memory.needEnergy)
            }
        });
        return targets
    }

    getNeedEnergyContainer() {
        var container = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity &&
                        structure.pos.x != constant.STRUCTURE_CONTAINER_TOP_POSITION[0] &&
                        structure.pos.x != constant.STRUCTURE_CONTAINER_BOTTOM_POSITION[0]) ||
                    (structure.pos.x == constant.STRUCTURE_CONTAINER_BOTTOM_POSITION[0] &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity / 5)
            }
        });
        return container
    }

    getNeedEnergyStorage() {
        let strage = Game.getObjectById(constant.STRUCTURE_STORAGE_ID)
        if (strage.store[RESOURCE_ENERGY] < strage.storeCapacity) {
            return strage
        }
        return null
    }

}


module.exports = Carry;