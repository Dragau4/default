var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towerControl = require('tower.control');
var roleRescuer = require('role.rescuer');

module.exports.loop = function () {



    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    

    for (var name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    console.log('Carriers: ' + carriers.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);


    if (carriers.length == 0) {
        var emergencyMode = true
    }


   
    if (carriers.length < 3) {
        var newName = 'Carrier.' + Game.time;
        
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'carrier' } });
    }
    else if (builders.length < 3) {
        var newName = 'Builder.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } });
    }
    else if (upgraders.length < 3) {
        var newName = 'Upgrader.' + Game.time;

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (emergencyMode) {
            roleRescuer.run(creep)
        }
        else {
            
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

    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    if (towers) {
        for (var tower in towers) {
            towerControl.run(tower)

        }
    }
    else {
        console.log("no tower found")
    }

}