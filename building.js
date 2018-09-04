function build(spawn) {
    var structures = spawn.room.find(FIND_STRUCTURES, {filter: {STRUCTURE_EXTENSION, my: true}});
    if(CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][spawn.room.controller.level] - structures.length > 0) {
        (new RoomPosition(spawn.pos.x-3, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x-1, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x+1, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x+3, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x-3, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x-1, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x+1, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x+3, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x-1, spawn.pos.y+3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
        (new RoomPosition(spawn.pos.x+1, spawn.pos.y+3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_EXTENSION);
    }

    var structures = spawn.room.find(FIND_STRUCTURES, {filter: {STRUCTURE_TOWER, my: true}});
    if(CONTROLLER_STRUCTURES[STRUCTURE_TOWER][spawn.room.controller.level] - structures.length > 0) {
        (new RoomPosition(spawn.pos.x, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_TOWER);
    }

    (new RoomPosition(spawn.pos.x-2, spawn.pos.y-3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x, spawn.pos.y-3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y-3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-3, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-2, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-1, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+1, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+3, spawn.pos.y-2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);

    (new RoomPosition(spawn.pos.x-2, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y-1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-3, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-2, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-1, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+1, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+3, spawn.pos.y, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);

    (new RoomPosition(spawn.pos.x-2, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y+1, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-3, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-2, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x-1, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+1, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+3, spawn.pos.y+2, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);

    (new RoomPosition(spawn.pos.x-2, spawn.pos.y+3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x, spawn.pos.y+3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
    (new RoomPosition(spawn.pos.x+2, spawn.pos.y+3, spawn.pos.roomName)).createConstructionSite(STRUCTURE_ROAD);
}

function calcBodyCost(body) {
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
}

exports.run = function(spawn) {

    build(spawn);

    var workerBody = [], bodyIteration = [MOVE,MOVE,WORK,CARRY];
    while(calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns.Spawn1.room.energyAvailable &&
          workerBody.length + bodyIteration.length <= MAX_CREEP_SIZE) {
        workerBody = workerBody.concat(bodyIteration);
    }

    spawn.spawnCreep(workerBody, 'h1', {memory: {role: 'harvester'}});
    spawn.spawnCreep(workerBody, 'h2', {memory: {role: 'harvester'}});

    spawn.spawnCreep([MOVE,MOVE,WORK,WORK,CARRY], 'u1', {memory: {role: 'upgrader'}});
    //spawn.spawnCreep(workerBody, 'u2', {memory: {role: 'upgrader'}});

    if(spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        spawn.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY], 'b1', {memory: {role: 'builder'}});
        spawn.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY], 'b2', {memory: {role: 'builder'}});
        //spawn.spawnCreep(workerBody, 'b3', {memory: {role: 'builder'}});
    }
    if(spawn.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax}).length > 0) {
        spawn.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY], 'r1', {memory: {role: 'repair'}});
        spawn.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY], 'r2', {memory: {role: 'repair'}});
    }
    //spawn.spawnCreep([WORK,CARRY,MOVE], 'rg1', {memory: {role: 'ranger'}});

}