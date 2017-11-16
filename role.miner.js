var roleMiner = {

    run: function (creep) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE) 
        if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            creep.say(source)
        }
    }

}
module.exports = roleMiner;