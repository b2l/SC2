var Unit = require('./Unit');

function Units() {
    this._units = [];
}

Units.prototype.all = function() {
    return this._units;
};

Units.prototype.create = function(desc) {
    var unit = new Unit(desc);
    this._units.push(unit);
    return unit;
};

module.exports = Units;