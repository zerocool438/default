var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.say(`${creep.owner.username}`);
        //creep.say(`${creep.room.name}`);
        if(creep.memory.unloading && creep.carry.energy == 0) {
            creep.memory.unloading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.unloading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say('unloading');
        }
        if(!creep.memory.unloading) {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length > 0)
            {
                if(creep.memory.path == 'undefine') {
                    creep.memory.path = creep.pos.findPathTo(sources[0]);
                }
            }
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveByPath(creep.memory.path, {visualizePathStyle: {stroke: '#ffffff'}});
                //creep.pos.createConstructionSite(STRUCTURE_ROAD);
            }
            else
            {
                creep.memory.path = 'undefine';
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(target) {
                var path = creep.room.findPath(creep.pos, target.pos, {ignoreCreeps: true});
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    var path = creep.pos.findPathTo(target);
                    if(path.length > 0) {
                        creep.move(path[0].direction);
                    } else {
                        creep.say(`No way!`);
                    }
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleHarvester;