/**
 * carry的任务队列，从这个队列中取出需要输送能量的单位
 */
let constant = require('constant')
module.exports = {

  start() {
    let containers = Game.rooms[constant.ROOM1].find(FIND_STRUCTURES, {
      filter: (st) => {
        return st.structureType == STRUCTURE_CONTAINER && st.id!=constant.STRUCTURE_CONTAINER_TOP_ID
      }
    })

    containers.forEach(con => {
      const memoryTask = this.getTask(con.id)
      if (memoryTask.needEnergy && con.store[RESOURCE_ENERGY] == con.storeCapacity) {
        this.removeTask(con.id)
      }
      if(!memoryTask.needEnergy && con.store[RESOURCE_ENERGY] < con.storeCapacity / 5){
        this.addTask(con.id)
      }

    });

  },
  getTask(id) {
    if (_.isUndefined(Memory.taskQueue)) {
      Memory.taskQueue = {};
    }
    if (!_.isObject(Memory.taskQueue)) {
      return undefined;
    }
    return (Memory.taskQueue[id] = Memory.taskQueue[id] || {});
  },
  addTask(id) {
    if (_.isUndefined(Memory.taskQueue)) {
      Memory.taskQueue = {};
    }
    if (!_.isObject(Memory.taskQueue)) {
      throw new Error("Could not set room object " + this.tower.id + " memory");
    }
    if (_.isUndefined(Memory.taskQueue[id])) {
      Memory.taskQueue[id] = {}
    }

    Memory.taskQueue[id].needEnergy = true;

  },
  removeTask(id) {
    if (_.isUndefined(Memory.taskQueue)) {
      Memory.taskQueue = {};
    }
    if (!_.isObject(Memory.taskQueue)) {
      throw new Error("Could not set room object " + this.tower.id + " memory");
    }
    if(Memory.taskQueue.id){
      delete Memory.taskQueue[id];
    }
  }
}