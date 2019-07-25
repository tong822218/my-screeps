/**
 * 收割者的基类
 * @param {tower} tower 
 */
let Creep = require('Creep')
let constant = require('constant')

class Harvester extends Creep {

    constructor(creep){
        super(creep)
    }
    
    start(){
       const topContainer = Game.getObjectById(constant.STRUCTURE_CONTAINER_TOP_ID)
        if(!this.isInTargetPostion(topContainer)){
            this.moveTo(topContainer)
        } else if(topContainer.store[RESOURCE_ENERGY] < topContainer.storeCapacity){
            const source = Game.getObjectById(constant.STRUCTURE_SOURCE_TOP_ID)
            this.harvest(source)
        } else{
            this.creep.saying('尿满了！')
        }
    }

    // 开始收割资源
    harvest (source){
        this.creep.harvest(source)
    }
}

module.exports = Harvester;