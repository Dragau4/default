module.exports =
    {
        
        run: function (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < (structure.hitsMax /2)
            });
          
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            
        }
    };