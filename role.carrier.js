var roleCarrier = {

   
    run: function (creep) {

        

            if (creep.memory.carrying && creep.carry.energy == 0) {
                creep.memory.carrying = false;

            }
            if (!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
                creep.memory.carrying = true;

            }

            if (creep.memory.carrying) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
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
                        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
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
                                var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(droppedEnergy);
                                }
                            }
                        }
                    }
                    else {
                        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy);
                        }
                    }
                }
                    
            }
            else {
                var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy);
                }
            }

            
            
        
    }
};

module.exports = roleCarrier;