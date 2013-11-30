var bootstrap = require('./bootstrap');
var Units = require('./Units');

var units = new Units();

bootstrap(units);

/** START SERVER */
var express = require('express');
var app = express();

/** MIDDLEWARE */
app.use(express.static(__dirname + '/../../public/'));

// Allow us to nicely declare routes
app.map = require('./lib/dispatcher')(app);

/** ROUTES */
app.map({
    '/': {
        get: function(req, res) {
            res.sendfile('public/html/index.html');
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