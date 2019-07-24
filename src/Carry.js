/**
 * 运送者的基类
 * @param {tower} tower 
 */

 let constant = require('constant')

var Carry = function (creep) {
    this.creep = creep
}

Carry.prototype.withDraw = function () {
    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if (target && this.creep.pos.getRangeTo(target) < =3) {
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
}


module.exports = Carry;