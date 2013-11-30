var XHR = require('reqwest');

var $appWrapper = document.getElementById('app-wrapper');

XHR({
    url: '/units',
    type: 'get'
}).then(function(res) {
    onGetUnits(res);
}).fail(function(err, mesg) {
    $appWrapper.write('ERROR retrieving units : ', err, mesg);
});

function onGetUnits(res) {
    var units = JSON.parse(res.response);
    var ul = document.createElement('ul');
    units.forEach(function(unit) {
        var li = document.createElement('li');
        li.innerHTML = unit.name + " - " + unit.race;
        ul.appendChild(li);
    });
    $appWrapper.appendChild(ul);
}


