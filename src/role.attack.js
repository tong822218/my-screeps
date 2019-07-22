var roleAttack = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repair && creep.carry.energy == 0) {
            creep.memory.repair = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repair = true;
            creep.say('⚡ repair');
        }

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax &&
                (
                    object.structureType == STRUCTURE_CONTAINER ||
                    object.structureType == STRUCTURE_TOWER ||
                    object.structureType == STRUCTURE_SPAWN ||
                    object.structureType == STRUCTURE_ROAD
                )
        });

        // targets.sort((a, b) => a.hits - b.hits);

        if (creep.memory.repair) {
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            var container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                }
            });

            if (container.length > 0 && creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
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
        }


        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleAttack;