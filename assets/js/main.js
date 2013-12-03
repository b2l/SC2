var XHR = require('reqwest');
var Q = require('q');
var _unitList = require('./templates/unitList');

var $appWrapper = document.getElementById('app-wrapper');

function Units(){
    this.units = [];
    this.cache;
}

Units.all = function() {
    var deferred = Q.defer();

    // Memoize
    if (this.cache && this.cache.units && this.cache.units.length > 0) {
        deferred.resolve(this.cache);
    } else {
        XHR({
            url: '/units',
            type: 'get'
        }).then(function(res) {
            var u = new Units();
            var units = JSON.parse(res.response);
            units.forEach(function(unit) {
                u.add(unit);
            });
            this.cache = u;
            setTimeout(function() {
                deferred.resolve(u);

            }, 1000);
        }.bind(this)).fail(function(err, mesg) {
            deferred.reject(err, mesg);
        });
    }

    return deferred.promise;
};

Units.prototype.add = function(unit) {
    this.units.push(unit);
};

Units.prototype.forEach = function(cb) {
    Array.prototype.forEach.call(this.units, cb);
};

function UnitView($element, modelPromise) {
    this.$element = $element;
    this.units = null;

    this.preRender();
    modelPromise.then(function(units) {
        this.units = units;
        this.render();
    }.bind(this));
}

UnitView.prototype.preRender = function() {
    this.$element.innerHTML = "Chargement en cours...";
};

UnitView.prototype.render = function() {
    this.$element.innerHTML = _unitList(this.units);
};


// In router
var view = new UnitView($appWrapper, Units.all());

document.addEventListener('click', function(e) {
    view = null;
    view = new UnitView($appWrapper, Units.all());
});