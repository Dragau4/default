var roleCarrier = {

   
    run: function (creep) {

        

            if (creep.memory.carrying && creep.carry.energy == 0) {
                creep.memory.carrying = false;

            }
            if (!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
                creep.memory.carrying = true;

            }

            if (creep.memory.carrying) {
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
                    if (creep.memory.carrying && creep.carry.energy == 0) {
                        creep.memory.carrying = false;

                    }
                    if (!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
                        creep.memory.carrying = true;

                    }

                    if (creep.memory.carrying) {
                        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                        if (target) {
                            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }
                        else {
                            if (creep.memory.carrying && creep.carry.energy == 0) {
                                creep.memory.carrying = false;

                            }
                            if (!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
                                creep.memory.carrying = true;

                            }

                            if (creep.memory.carrying) {
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
                                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(energy);
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
                        if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(energy);
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
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }

            
            
        
    }
};

module.exports = roleCarrier;