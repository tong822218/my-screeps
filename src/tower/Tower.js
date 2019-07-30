/**
 * 塔的基类
 * @param {tower} tower 
 */

class Tower {
    constructor(tower) {
        this.tower = tower
        this.tower.memory = this.getMemory()
    }

    start() {
        this.checkNeedEnergy() // 塔么有memory，没法用这个方式，有待改造
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
            filter: (structure) => (structure.structureType == STRUCTURE_WALL &&
                structure.hits < 10000) || (structure.structureType != STRUCTURE_WALL &&
                structure.hits < structure.hitsMax)
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
    checkNeedEnergy() {

        if (this.tower.energy < this.tower.energyCapacity / 2) {
            this.setMemory('needEnergy', true)
        }
        if (this.tower.energy == this.tower.energyCapacity) {
            this.setMemory('needEnergy', false)
        }
    }

    getMemory() {
        if (_.isUndefined(Memory.towers)) {
            Memory.towers = {};
        }
        if (!_.isObject(Memory.towers)) {
            return undefined;
        }
        return (Memory.towers[this.tower.id] = Memory.towers[this.tower.id] || {});

    }
    setMemory(key, value) { // 设置memory 
        if (_.isUndefined(Memory.towers)) {
            Memory.towers = {};
        }
        if (!_.isObject(Memory.towers)) {
            throw new Error("Could not set room object " + this.tower.id + " memory");
        }
        if (_.isUndefined(Memory.towers[this.tower.id])) {
            Memory.towers[this.tower.id] = {}
        }

        Memory.towers[this.tower.id][key] = value;
        this.tower.memory = Memory.towers[this.tower.id]

    }


}



module.exports = Tower;