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
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = roleUpgrader;