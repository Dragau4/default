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
                            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
                });

                var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });

                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else if (tower) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower);
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
                                var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(source);
                                }
                            }
                        }
                    }
                    else {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    }
                }
                    
            }
            else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }

            
            
        
    }
};

module.exports = roleCarrier;