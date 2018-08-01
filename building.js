function getRandomFreePos(startPos, distance) {
    var x,y;
    do {
        x = startPos.x + Math.floor(Math.random()*(distance*2+1)) - distance;
        y = startPos.y + Math.floor(Math.random()*(distance*2+1)) - distance;
    }
    while((x+y)%2 != (startPos.x+startPos.y)%2 || Game.map.getTerrainAt(x,y,startPos.roomName) == 'wall');
    return new RoomPosition(x,y,startPos.roomName);
}

function build(spawn, structureType) {
    var structures = spawn.room.find(FIND_STRUCTURES, {filter: {structureType, my: true}});
    for(var i=0; i < CONTROLLER_STRUCTURES[structureType][spawn.room.controller.level] - structures.length; i++) {
        getRandomFreePos(spawn.pos, 5).createConstructionSite(structureType);
    }
}

function calcBodyCost(body) {
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
}

exports.run = function(spawn) {

    build(spawn, STRUCTURE_EXTENSION);
    build(spawn, STRUCTURE_TOWER);

    var workerBody = [], bodyIteration = [MOVE,MOVE,WORK,CARRY];
    while(calcBodyCost(workerBody) + calcBodyCost(bodyIteration) <= Game.spawns.Spawn1.room.energyAvailable &&
          workerBody.length + bodyIteration.length <= MAX_CREEP_SIZE) {
        workerBody = workerBody.concat(bodyIteration);
    }

    spawn.spawnCreep(workerBody, 'h1', {memory: {role: 'harvester'}});
    spawn.spawnCreep(workerBody, 'h2', {memory: {role: 'harvester'}});

    spawn.spawnCreep(workerBody, 'u1', {memory: {role: 'upgrader'}});
    spawn.spawnCreep(workerBody, 'u2', {memory: {role: 'upgrader'}});

    if(spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        spawn.spawnCreep(workerBody, 'b1', {memory: {role: 'builder'}});
        spawn.spawnCreep(workerBody, 'b2', {memory: {role: 'builder'}});
    }
    if(spawn.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax}).length > 0) {
        spawn.spawnCreep(workerBody, 'r1', {memory: {role: 'repair'}});
        spawn.spawnCreep(workerBody, 'r2', {memory: {role: 'repair'}});
    }
    spawn.spawnCreep([WORK,CARRY,MOVE], 'rg1', {memory: {role: 'ranger'}});

}