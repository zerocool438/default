var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var roleRanger = require('role.ranger');
var building = require('building');
var tower = require('tower');

module.exports.loop = function () {

    Memory.ranger_target = 'undefined';
    //Memory.ranger_target = 'W9N9';

    building.run(Game.spawns.Spawn1);

    var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER, my: true}});
    towers.forEach(tower.run);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    console.log('Repairers: ' + repairs.length);
    var rangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranger');
    console.log('Rangers: ' + rangers.length);

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