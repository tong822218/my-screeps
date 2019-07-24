/**
 * 游戏总的调度对象
 */

var Harvester = require('Harvester');
var clearMemory = require('helper.clear_memory');
var Tower = require('Tower');

let towers = [] // 所有的塔对象

module.exports = {
    // 游戏初始化
    init: function () {

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
                myTower.init()
                towers.push(myTower)
            }
        }

        //



    }
}