var _unitList = require('../templates/unitList');
var $ = require('qwery');

// --- Constructor
function UnitComparison($element, modelPromise) {
    this.$element = $element;
    this.units = null;

    this.preRender();
    modelPromise.then(function(units) {
        this.units = units;
        this.render();
    }.bind(this));
}

// Display loader and static content
UnitComparison.prototype.preRender = function () {
    this.$element.innerHTML = "Chargement en cours...";
};

UnitComparison.prototype.render = function () {
    this.$element.innerHTML = _unitList(this.units);
};

module.exports = UnitComparison;