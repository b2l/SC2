var FS = require('q-io/fs');
var Q = require('q');
var XMLParser = require('xml2js').Parser;

function SC2DataParser() {
}

SC2DataParser.prototype.parse = function(filePath) {
    var deferred = Q.defer();
    var parser = new XMLParser();

    FS.read(filePath).then(function(content) {
        parser.parseString(content, function(err, result) {
            if (err) {
                throw new Error('Parsing error ', err);
            }
            deferred.resolve(resultq);
        });
    }, function(err) {
        console.error(err);
    });

    return deferred.promise;
};

module.exports = SC2DataParser;