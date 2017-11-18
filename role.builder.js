var roleBuilder = {

   
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            
        }

        if (creep.memory.building) {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                if (creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;

                }
                if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.building = true;

                }

                if (creep.memory.building) {
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
                    if (energy) {
                        if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(energy);
                        }
                    }
                    else if (storage){
                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                }
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

module.exports = roleBuilder;