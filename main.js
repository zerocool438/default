var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleRanger = require('role.ranger');
var building = require('building');
var tower = require('tower');

module.exports.loop = function () {

    //Memory.ranger_target = 'undefined';
    Memory.ranger_target = 'W9N1';

    building.run(Game.spawns.Spawn1);

    var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER, my: true}});
    towers.forEach(tower.run);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'ranger') {
            creep.memory.target_room = Memory.ranger_target;
            roleRanger.run(creep);
        }
    }
}