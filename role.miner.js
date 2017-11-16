var roleMiner = {

    run: function (creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) 
        if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            creep.say('Waiting')
        }
    }

}
module.exports = roleMiner;