/**
 * carry的任务队列，从这个队列中取出需要输送能量的单位
 */

module.exports = {

  start(room) {
    let containers = Game.rooms[room].find(FIND_STRUCTURES, {
      filter: (st) => {
        return st.structureType == STRUCTURE_CONTAINER
      }
    })

    containers.forEach(con => {
      const memoryTask = this.getTask(con.id)
      if (memoryTask.needEnergy && con.store[RESOURCE_ENERGY] == structure.storeCapacity) {
        memoryTask.needEnergy = false
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