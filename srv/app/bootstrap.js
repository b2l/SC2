var Units = require('./Units');
var FS = require('q-io/fs');
var SC2DataParser = require('./lib/SC2DataParser');

function Race(race) {
    this._race = {
        'Prot': 'protoss',
        'Terr': 'terran',
        'Zerg': 'zerg'
    };

    return this._race[race] || undefined;
}

function addFixtures(units) {

    var pUnits = require('../../resources/protoss-units.json');
    var zUnits = require('../../resources/zerg-units.json');
    var tUnits = require('../../resources/terran-units.json');

    var allUnits = pUnits.concat(zUnits).concat(tUnits);
    allUnits.forEach(function(unit) {
        units.create(unit);
    });
}

module.exports = function (units) {
    /* Load data on startup */
    if (units.all().length === 0) {
        addFixtures(units);
    }
};