"use stric";
var Q = require('q');
var XHR = require('reqwest');

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


module.exports = Units;