const constant = require('constant')
module.exports = {

    // 查找最顶端的container
    topContainer: function (room) {
        const target = Game.rooms[room].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.pos.x == constant.STRUCTURE_CONTAINER_TOP_POSITION[0]
            }
        });
        if (target && target[0]) {
            return target[0]
        }
        return null
    },

    // 查找中间的container
    centerContainer: function (room) {
        const target = Game.rooms[room].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.pos.x == constant.STRUCTURE_CONTAINER_CENTER_POSITION[0]
            }
        });
        if (target && target[0]) {
            return target[0]
        }
        return null
    },

    // 查找最底部的container
    bottomContainer: function (room) {
        const target = Game.rooms[room].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.pos.x == constant.STRUCTURE_CONTAINER_BOTTOM_POSITION[0]
            }
        });
        if (target && target[0]) {
            return target[0]
        }
        return null
    }


}