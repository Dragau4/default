var roleUpgrader = {


    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;

        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;

        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            
            if (storage) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else if (energy) {
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }
            
        }
    }
};

module.exports = roleUpgrader;