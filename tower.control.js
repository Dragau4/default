var towerControl = {


    run: function (tower) {

        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax / 2)
        });

        if (enemy) {
            tower.attack(enemy);
        }
        else if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        } 

            
           
        
    }
};

module.exports = towerControl;
