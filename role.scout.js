var roleScout = {

    run: function (creep) {
        if (!creep.pos.isNearTo(Game.flags.Flag1)) {
            creep.moveTo(Game.flags.Flag1)
        }
        
    }

}

module.exports = roleScout