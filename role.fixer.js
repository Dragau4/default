var roleFixer = {


    run: function (creep) {

        if (creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false;

        }
        if (!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fixing = true;

        }

        if (creep.memory.fixing) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                creep.say("Why do I exist")
                creep.say("What is my purpose")
            }
        }
        else {
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (resource) => {
                    return (resource.resourceType == RESOURCE_ENERGY)
                }
            });
            var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.energy > 0;
                }
            });
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (energy) {
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }
            else if (storage){
                if (creep.pickup(storage) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else if (source){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};

module.exports = roleFixer;