var roleBuilder = {

   
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            
        }

        if (creep.memory.building) {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
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
};

module.exports = roleBuilder;