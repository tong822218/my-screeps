/**
 * 塔的基类
 * @param {tower} tower 
 */

class Tower {
    constructor(tower){
        this.tower = tower
    }

    start() {
        // this.checkNeedEnergy() // 塔么有memory，没法用这个方式，有待改造
        this.repairClosestStructure()
        this.repairClosestCreep()
        this.defence()
    }
    attack(target) {
        this.tower.attack(target);
    }
    repair(target) {
        this.tower.repair(target);
    }
    findClosestHostileCreep() {
        return this.tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    }
    findClosestNotFullHitsStructures() {
        return this.tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
        });
    }
    // 找到最近的受伤creep
    findClosestNotFullHitsCreep() {
        return this.tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        });
    }
    // 修复受损建筑
    repairClosestStructure() {
        if (this.tower.energy > this.tower.energyCapacity / 3) { // 多于1/3能量时再修复建筑，留下的能量应对入侵
            const structure = this.findClosestNotFullHitsStructures()
            if (structure) {
                this.repair(structure)
            }
        }

    }
    // 修复受损creep
    repairClosestCreep() {
        const creep = this.findClosestNotFullHitsCreep()
        if (creep) {
            this.repair(creep)
        }
    }

    // 防御入侵者
    defence() {
        const hostile = this.findClosestHostileCreep()
        if (hostile) {
            this.attack(hostile)
        }
    }

    // 检查一下塔是否需要补充能量
    checkNeedEnergy(){
        if(this.tower.energy > this.tower.energyCapacity / 2){
            this.tower.memory.needEnergy = true
        }
        if(this.tower.energy = this.tower.energyCapacity){
            this.tower.memory.needEnergy = false
        }
    }


}



module.exports = Tower;