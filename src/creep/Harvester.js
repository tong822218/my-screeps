/**
 * 收割者的基类
 * @param {tower} tower 
 */
let Creep = require('creep_Creep')
let constant = require('constant')
let find = require('helper_find')

class Harvester extends Creep {

    constructor(creep) {
        super(creep)
    }

    start() {
        const topContainer = find.topContainer(constant.ROOM1)
        if (!topContainer) return
        if (!this.isInTargetPostion(topContainer)) {
            this.moveTo(topContainer)
        } else if (topContainer.store[RESOURCE_ENERGY] < topContainer.storeCapacity) {
            const source = Game.getObjectById(constant.STRUCTURE_SOURCE_TOP_ID)
            this.harvest(source)
            if (this.creep.carry > 0) {
                this.creep.drop(RESOURCE_ENERGY)
            }
        } else {
            this.creep.say('尿满了！')
        }
    }

    // 开始收割资源
    harvest(source) {
        this.creep.harvest(source)
    }
}

module.exports = Harvester;