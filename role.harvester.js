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
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                var path = creep.pos.findPathTo(source);
                if(path.length > 0) {
                    creep.move(path[0].direction);
                    //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                } else {
                    creep.say(`No way!`);
                }
                //creep.moveTo(target);
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
                var path = creep.pos.findPathTo(target);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    if(path.length > 0) {
                        creep.move(path[0].direction);
                        //creep.pos.createConstructionSite(STRUCTURE_ROAD);
                    } else {
                        creep.say(`No way!`);
                    }
                    //creep.moveTo(target);
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