/**
 * Tower管理
 */
var constant = require('constant')
var Tower = require('tower_Tower');

module.exports = {
    // 游戏初始化
    start: function () {
        // 初始化塔
        const towers = Game.rooms[constant.ROOM1].find(FIND_STRUCTURES, {
            filter: (st) => st.structureType == STRUCTURE_TOWER
        })
        if (towers.length > 0) {
            for (let t in towers) {
                var tower = towers[t];
                const myTower = new Tower(tower)
                myTower.start()
            }
        }
    }
}