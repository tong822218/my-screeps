/**
 * 运送者的基类
 * @param {tower} tower 
 */

let constant = require('constant')

var Carry = function (creep) {
    this.creep = creep
}

/**
 * 从目标处获取资源没有目标就从顶部container中获取
 */
Carry.prototype.withDraw = function (target) {

    if (target) {
        if (this.creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        const topContainer = Game.getObjectById(constant.container.top)
        if (this.creep.withdraw(topContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(topContainer);
        }
    }
}

/**
 * 将能量运输到目标
 */
Carry.prototype.transfer = function (target) {
    if (target) {
        if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
        }
    }
}

/**
 * distance: 查找的范围，默认3个距离
 */
Carry.prototype.pickup = function (distance = 3) {
    const targets = this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, distance);
    if (targets.length > 0) {
        if (this.creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}

module.exports = Carry;