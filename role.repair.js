/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            //creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	    //if(!creep.memory.repairing && creep.carry.energy != 0) {
	        creep.memory.repairing = true;
	        //creep.say('⚡ repair');
	    }

	    if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits/a.hitsMax - b.hits/b.hitsMax);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#FFFF00'}});
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    var path = creep.pos.findPath(creep.pos, source, ignoreCreeps);
                    if(path.length > 0) {
                        creep.move(path[0].direction);
                        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                    } else {
                        creep.say(`No way!`);
                    }
                }
            }
        } else {
            /*
            var storage = creep.room.find(FIND_SOURCES);
            if(creep.harvest(storage[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            */
            var sources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(sources) {
                if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#00FF00'}});
                }
            } else {
                var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy > 0;
                    }
                });
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#00FF00'}});
                }
            }

        }
	}
};

module.exports = roleRepair;