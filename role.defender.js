var roleDefender = {


    run: function (creep) {





        if (creep.carry.energy < creep.carryCapacity) {
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
        else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER);
                    }
                });
                if (tower) {
                    creep.moveTo(tower)
                }
            }
        }



        
    }
};

module.exports = roleDefender;