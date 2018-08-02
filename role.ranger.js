/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.ranger');
 * mod.thing == 'a thing'; // true
 */

var roleRanger = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var flag = Game.flags['RestPlace'];
        var flag1 = Game.flags['WarZone'];

        if(creep.memory.target_room != 'undefined') {
            if(creep.room.name == creep.memory.target_room) {

                //var target = Game.getObjectById('a73713380de6487');
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
                });
                if(target) {
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#00FF00'}});
                    }
                } else {
                    var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    //var target = Game.getObjectById('a73713380de6487');
                    if(target) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#FF0000'}});
                    }
                }

            }
            else 
            {
                //var exitDir = creep.room.findExitTo(creep.memory.target_room);
                //var exit = creep.pos.findClosestByRange(exitDir);
                //var exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                //var exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                //var exit = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
                //creep.moveTo(exit, {visualizePathStyle: {stroke: '#FF0000'}});

                if(flag1) {
                    creep.moveTo(flag1, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
            }
        } else {
            creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
        }

	}
};

module.exports = roleRanger;