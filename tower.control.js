var towerControl = {


    run: function (tower) {
        var closestDamagedRoad = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_ROAD &&
                structure.hits < structure.hitsMax
        });
        var closestDamagedRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_RAMPART) &&
                (structure.hits <= 30000)
        });
        var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType == STRUCTURE_WALL) &&
                (structure.hits <= 30000)
        });
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
        else if (closestDamagedRoad && tower.energy >= 500) {
            tower.repair(closestDamagedRoad);
        }
        else if (closestDamagedRampart && tower.energy >= 500) {
            tower.repair(closestDamagedRampart);
        }
        else if (closestDamagedWall && tower.energy >= 500) {
            tower.repair(closestDamagedWall);
        }


    }
}
module.exports = towerControl;