/* Load data on startup */
var Units = require('./Units');
var FS = require('q-io/fs');
var SC2DataParser = require('./lib/SC2DataParser');

function Race(race) {
    this._race = {
        'Prot': 'protoss',
        'Terr': 'terran',
        'Zerg': 'zerg'
    }

    return this._race[race] || undefined;
};

var units = new Units();
if ( units.all().length === 0 ) {

    var filePath = FS.absolute('resources/UnitData.xml');
    var parser = new SC2DataParser();

    parser.parse(filePath).then(function(data) {

        data.Catalog.CUnit.forEach(function(unit) {
            var obj = {};
            obj.name = unit.$.id;

            if (unit['Race']) {
                obj.race = Race(unit['Race'][0].$.value);
                units.create(obj);
            }
        });


    }, function(err) {
        console.error(err);
    });
}

/* START SERVER */
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.redirect('/units');
});

app.get('/units', function(req, res) {
    res.json(
        units.all()
    );
});

app.get('/units/:race', function(req, res) {
    res.json(
        units.byRace(req.params.race)
    );
});

app.listen(3000);