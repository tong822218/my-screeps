/**
 * 建筑管理
 */
var find = require('helper_find')
var constant = require('constant')

module.exports = {
    // 游戏初始化
    start: function () {

        this.checkStructureState()

    },
    checkStructureState:function(){
        let target = find.topContainer(constant.ROOM1)
        if(!target){
            Game.rooms[constant.ROOM1].createConstructionSite(constant.STRUCTURE_CONTAINER_TOP_POSITION[0],constant.STRUCTURE_CONTAINER_TOP_POSITION[1], STRUCTURE_CONTAINER)
        }
        target = find.centerContainer(constant.ROOM1)
        if(!target){
            Game.rooms[constant.ROOM1].createConstructionSite(constant.STRUCTURE_CONTAINER_CENTER_POSITION[0],constant.STRUCTURE_CONTAINER_CENTER_POSITION[1], STRUCTURE_CONTAINER)
        }
        target = find.bottomContainer(constant.ROOM1)
        if(!target){
            Game.rooms[constant.ROOM1].createConstructionSite(constant.STRUCTURE_CONTAINER_BOTTOM_POSITION[0],constant.STRUCTURE_CONTAINER_BOTTOM_POSITION[1], STRUCTURE_CONTAINER)
        }
    }
}