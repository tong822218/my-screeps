/**
 * creep创建工厂
 */

var CreepFactory = function (spawn) {
    this.spawn = spawn
    this.sequence = [] // creep 创建序列
}
CreepFactory.prototype.createCreep = function () {
    const creep = this.sequence.shift()
    if(creep){
        this.spawn.spawnCreep()
    }
}


module.exports = CreepFactory;