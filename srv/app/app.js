var bootstrap = require('./bootstrap');
var Units = require('./Units');

var units = new Units();

bootstrap(units);

/** START SERVER */
var express = require('express');
var app = express();

/** MIDDLEWARE */
// Gzip
app.use(express.compress());
// Static
app.use(express.static(__dirname + '/../../public/'));

// Allow us to nicely declare routes
app.map = require('./lib/dispatcher')(app);

/** ROUTES */
app.map({
    '/': {
        get: function(req, res) {
            res.render(__dirname + '/views/index.ejs');
        },
        'units': {
            get:  function(req, res) {
                res.json(
                    units.all()
                );
            },
            '/:race': {
                get: function(req, res) {
                    res.json(
                        units.byRace(req.params.race)
                    );
                }
            }
        }
    }

});

app.listen(process.env.PORT || 3000);