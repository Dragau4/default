

var respawnHandler = {

    run: function () {

        for (var name in Game.rooms) {
            var room = Game.rooms[name];
            
            var sources = room.find(FIND_SOURCES);
            
        }

        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
        
         var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
         
         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
         
         var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
     
         var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
     
         var mainteners = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintener');
     
         var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleaner');

        if (miners.length < sources.length) {
            var newName = 'Miner.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE,MOVE,MOVE, MOVE], newName, { memory: { role: 'miner' } });
        }
        else if (carriers.length < 3) {
            var newName = 'Carrier.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier' } });
        }
        else if (builders.length < 5) {
            var newName = 'Builder.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder' } });
        }
        else if (upgraders.length < 5) {
            var newName = 'Upgrader.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader' } });
        }
        else if (scouts.length < 1) {
            var newName = 'Scout.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, TOUGH], newName, { memory: { role: 'scout' } });
        }
        else if (mainteners.length < 2) {
            var newName = 'Maintener.' + Game.time;
    
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'maintener' } });
    
        }
        else if (cleaners.length < 3){
            var newName = 'Cleaner.' + Game.time;
            
                    Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'cleaner' } });
        }
        else {
            
                console.log('Everything is normal')
            
            
    
        }        
    }

}
module.exports = respawnHandler