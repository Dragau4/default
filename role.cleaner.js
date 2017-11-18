var roleCleaner = {


    run: function (creep) {

        if (creep.memory.cleaning && creep.carry.energy == 0) {
            creep.memory.cleaning = false;

        }
        if (!creep.memory.cleaning && creep.carry.energy == creep.carryCapacity) {
            creep.memory.cleaning = true;

        }

        if (creep.memory.cleaning) {
            var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            
            if (storage) {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
                else if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_FULL) {

                }
            }
            
        }
        else {
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (resource) => {
                    return (resource.resourceType == RESOURCE_ENERGY)
                }
            });
            
            if (energy) {
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }
            
        }
    }
};

module.exports = roleCleaner;
