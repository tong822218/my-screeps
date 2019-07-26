module.exports = {
    // creep 类型
    CREEP_TYPE_HARVESTER: 'haverster',
    CREEP_TYPE_CARRY: 'carry',
    CREEP_TYPE_UPGRADER: 'upgrader',
    CREEP_TYPE_WORK: 'work',
    CREEP_TYPE_BUILDER:'builder',

    // creep身体构造
    CREEP_BODY_HARVESTER: ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'MOVE', 'MOVE'],
    CREEP_BODY_CARRY: ['CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE'],
    CREEP_BODY_UPGRADER: ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'MOVE', 'MOVE'],
    CREEP_BODY_BUILDER: ['WORK', 'WORK', 'WORK', 'WORK', 'CARRY', 'CARRY', 'CARRY', 'CARRY', 'MOVE', 'MOVE', 'MOVE', 'MOVE'],

    // container id
    STRUCTURE_CONTAINER_TOP_ID: "5d3417f3cc71b07cbee8d9a8",
    STRUCTURE_CONTAINER_CENTER_ID: '5d33345bd4f3583fee9085d7',
    STRUCTURE_CONTAINER_BOTTOM_ID: '5d37f48ac08d9e7cff86ad50',
    // 房间顶部资源池id
    STRUCTURE_SOURCE_TOP_ID: "5bbcacb49099fc012e6360d5"
}