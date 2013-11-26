var expect = require('chai').expect;
var FS = require('fs');
var SC2DataParser = require('../lib/SC2DataParser');

describe('Parser', function() {


    it(' should extract units name', function(done) {
        var filePath = FS.realpathSync('./resources/UnitData.xml');
        var parser = new SC2DataParser();

        parser.parse(filePath).then(function(data) {
            expect(data.Catalog.CUnit).to.have.length(288);

            // Test that there is a Zergling
            var oracle = data.Catalog.CUnit.filter(function(unit) {
                return unit.$.id === "Oracle";
            });
            expect(oracle).to.have.length(1);
            done()
        });
    });

});