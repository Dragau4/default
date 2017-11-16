var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towerControl = require('tower.control');
var roleFixer = require('role.fixer');
var roleMiner = require('role.miner');
var roleDefender = require('role.defender');
var roleScout = require('role.scout');

module.exports.loop = function () {

    var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
    
    for (turret in towers) {
        
        var tower = towers[turret]
        towerControl.run(tower)
    }

  
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(name,'dieded');
        }
    }

    

    for (var name in Game.rooms) {
        var room = Game.rooms[name];
        console.log('Room "' + name + '" has ' + room.energyAvailable + ' energy');
        var sources = room.find(FIND_SOURCES);
        
    }

    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
   
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

    if (carriers.length == 0 || miners.length == 0) {
        var emergencyMode = true
        console.log('Emergency Mode activated')
    }
    else {
        var emergencyMode = false
        
    }
   
    


    var fixers = carriers.length + upgraders.length + miners.length + builders.length;

    if (emergencyMode) {

        
        Game.notify('No carrier left, Emergency Mode activated', 30);
        console.log('Fixers: ' + fixers);
        
       
        if (fixers === 0) {
            Game.notify(' /!\ ALERT /!\ ALERT /!\ NO FIXER I REPEAT NO FIXER')
            console.log('/!\ ALERT /!\ ALERT / !\ NO FIXER I REPEAT NO FIXER')
            var newName = 'Fixer.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'carrier' } });
        }
        else {
            Game.notify(fixers + ' fixers are fixing our colony', 10)
            console.log(fixers + ' fixers are fixing our colony')
        }
    }
    else {

        console.log('Carriers: ' + carriers.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Builders: ' + builders.length);
        console.log('Miners: ' + miners.length)
        console.log('Scouts: '+ scouts.length)
        
    }

    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'scout') {
            roleScout.run(creep)
            var ennemyInRoom = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (ennemyInRoom) {
                var underAttack = true
                console.log(underAttack)
            }
            else {
                var underAttack = false
                console.log(underAttack)
            }

        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (underAttack) {
            roleDefender.run(creep)
        }
        else if (emergencyMode) {
            roleFixer.run(creep)
        }
        else  {
            if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            if (creep.memory.role == 'carrier') {
                roleCarrier.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }

    if (miners.length < sources.length) {
        var newName = 'Miner.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, { memory: { role: 'miner' } });
    }
    else if (carriers.length < 6) {
        var newName = 'Carrier.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier' } });
    }
    else if (builders.length < 5) {
        var newName = 'Builder.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder' } });
    }
    else if (upgraders.length < 3) {
        var newName = 'Upgrader.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader' } });
    }
    else if (scouts.length < 1) {
        var newName = 'Scout.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, TOUGH], newName, { memory: { role: 'scout' } });
    }
    else {
        if (!emergencyMode) {
            console.log('Everything is normal')
        }

    }

  

}