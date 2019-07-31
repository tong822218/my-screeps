/**
 * 游戏总的调度对象
 */

var clearMemory = require('helper_clear_memory');
var Tower = require('tower_Tower');
var CreepManage = require('CreepManage')
var taskQueue = require('carryTaskQueue')

module.exports = {
    // 游戏初始化
    start: function () {

        // 清理内存中死掉的creep
        clearMemory()

        // 初始化塔
        const towers = Game.rooms['W3N29'].find(FIND_STRUCTURES, {
            filter: (st) => st.structureType == STRUCTURE_TOWER
        })
        if (towers.length > 0) {
            for (let t in towers) {
                var tower = towers[t];
                const myTower = new Tower(tower)
                myTower.start()
            }
        }

        // carry任务队列初始化
        // taskQueue.start()

        // 初始化creep
        CreepManage.start()

    }
}