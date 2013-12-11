var _unitList = require('../../templates/unitList');
var _unitInfo = require('../../templates/unitInfo');
var $ = require('qwery');

// --- Constructor
function UnitComparison($element, modelPromise) {
    this.$element = $element;
    this.units = null;
    this.firstUnit = null;
    this.secondUnit = null;

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
    this.bindEvent();
};
UnitComparison.prototype.renderFirstUnitInfo = function () {
    this.$element.querySelector('.compare-unit-one .unit-card').innerHTML = _unitInfo(this.firstUnit);
};
UnitComparison.prototype.renderSecondUnitInfo = function () {
    this.$element.querySelector('.compare-unit-two .unit-card').innerHTML = _unitInfo(this.secondUnit);
};

UnitComparison.prototype.bindEvent = function() {
    this.$element.querySelector('.compare-unit-one select').addEventListener('change', this.selectUnitOneHandler.bind(this));
    this.$element.querySelector('.compare-unit-two select').addEventListener('change', this.selectUnitTwoHandler.bind(this));
};

UnitComparison.prototype.selectUnitOneHandler = function (e) {
    this.firstUnit = this.units.find(function(unit) { return unit.name === e.target.value})[0];
    this.renderFirstUnitInfo();
};
UnitComparison.prototype.selectUnitTwoHandler = function (e) {
    this.secondUnit = this.units.find(function(unit) { return unit.name === e.target.value})[0];
    this.renderSecondUnitInfo();
};

module.exports = UnitComparison;