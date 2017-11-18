var roleMaintener = {

    run: function (creep) {

        if (creep.memory.maintaining && creep.carry.energy == 0) {
            creep.memory.maintaining = false;

        }
        if (!creep.memory.maintaining && creep.carry.energy == creep.carryCapacity) {
            creep.memory.maintaining = true;

        }

        if (creep.memory.maintaining) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity;
                }
            });
            
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                if (creep.memory.maintaining && creep.carry.energy == 0) {
                    creep.memory.maintaining = false;

                }
                if (!creep.memory.maintaining && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.maintaining = true;

                }

                if (creep.memory.maintaining) {
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
                        if (creep.memory.maintaining && creep.carry.energy == 0) {
                            creep.memory.maintaining = false;

                        }
                        if (!creep.memory.maintaining && creep.carry.energy == creep.carryCapacity) {
                            creep.memory.maintaining = true;

                        }

                        if (creep.memory.maintaining) {
                            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                            if (target) {
                                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(target);
                                }
                            }
                            else {
                                if (creep.memory.maintaining && creep.carry.energy == 0) {
                                    creep.memory.maintaining = false;

                                }
                                if (!creep.memory.maintaining && creep.carry.energy == creep.carryCapacity) {
                                    creep.memory.maintaining = true;

                                }

                                if (creep.memory.maintaining) {
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
}
module.exports = roleMaintener;