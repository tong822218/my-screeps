/**
 * 游戏总的调度对象
 */
var clearMemory = require('helper_clear_memory');
var towerManage = require('tower_towerManage');
var creepManage = require('creepManage')
var structureManage = require('structureManage')
var taskQueue = require('carryTaskQueue')

module.exports = {
    // 游戏初始化
    start: function () {

        // 清理内存中死掉的creep
        clearMemory()

        // 初始化塔
        towerManage.start()

        // 初始化建筑物（没有就创建）
        structureManage.start()

        // carry任务队列初始化
        taskQueue.start()

        // 初始化creep
        creepManage.start()

    }
}