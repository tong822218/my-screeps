/**
 * 收割者的基类
 * @param {tower} tower 
 */

let constant = require('constant')

var Harvester = function (creep) {
    this.creep = creep
}

/**
 * 移动到目标位置，准备收割资源
 */
Harvester.prototype.moveTo = function(target){
    this.creep.moveTo(target)
}

/**
 * 开始收割资源
 */
Harvester.prototype.harvest = function(source){
    this.creep.harvest(source)
}

/**
 * 判断creep是否已经在目标位置
 */
Harvester.prototype.isInTargetPostion = function(target){
    return this.creep.pos.isEqualTo(target)
}

module.exports = Harvester;