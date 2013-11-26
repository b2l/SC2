/* Load data on startup */
var Units = require('./Units');
var FS = require('q-io/fs');
var SC2DataParser = require('./lib/SC2DataParser');

var units = new Units();
if ( units.all().length === 0 ) {

    var filePath = FS.absolute('resources/UnitData.xml');
    var parser = new SC2DataParser();

    parser.parse(filePath).then(function(data) {

        data.Catalog.CUnit.forEach(function(unit) {
            var name = unit.$.id;
            units.create({name: name});
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

app.listen(3000);