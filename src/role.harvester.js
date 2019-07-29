var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transporting = true;
	        creep.say('⚡ transport');
	    }

        if (!creep.memory.transporting) { // 如果爬虫身上能量不满，就去获取能量

            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    });
                }
            }

        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            (structure.structureType == STRUCTURE_TOWER &&
                                (structure.memory && structure.memory.needEnergy))) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            } else { // spwan和extension都满了，就放到container中

                var container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                    }
                });
                const range = creep.pos.getRangeTo(container[0]);
                if (range == 0) {
                    creep.drop(RESOURCE_ENERGY);
                } else {
                    creep.moveTo(container[0])
                }
            }
        }
    }
};

module.exports = roleHarvester;