var Unit = require('./Unit');

function Units() {
    this._units = [];
}

Units.prototype.all = function() {
    return this._units;
};

Units.prototype.byRace = function(race) {
    return this._units.filter(function(unit) {
        return unit.race === race;
    });
}

Units.prototype.create = function(desc) {
    var unit = new Unit(desc);
    this._units.push(unit);
    return unit;
};

module.exports = Units;