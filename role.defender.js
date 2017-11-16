var roleDefender = {


    run: function (creep) {





        if (creep.carry.energy < creep.carryCapacity) {
            var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
            }
        }
        else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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