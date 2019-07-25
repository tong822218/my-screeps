/**
 * creep基类，所有creep都继承自这个类
 */
class Creep {

    constructor(creep) {
        this.creep = creep
    }

    /** 移动到目标位置 */
    moveTo(target) {
        return this.creep.moveTo(target)
    }

    /** 判断creep是否已经在目标位置 */
    isInTargetPostion = function (target) {
        return this.creep.pos.isEqualTo(target)
    }

    getRole(){
        return this.creep.memory.role
    }

    setRole(role){
        this.creep.memory.role = role
    }


}

module.exports = Creep