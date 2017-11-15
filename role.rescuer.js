var roleRescuer = {


    run: function (creep) {

        if (creep.memory.rescuing && creep.carry.energy == 0) {
            creep.memory.rescuing = false;

        }
        if (!creep.memory.rescuing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.rescuing = true;

        }

        if (creep.memory.rescuing) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                creep.say("Why do I exist")
                creep.say("What is my purpose")
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

module.exports = roleRescuer;