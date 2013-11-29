
var $appWrapper = document.getElementById('app-wrapper');

// TODO : Find a great lib for ajax call

//request
//    .post('/units')
//    .end(onGetUnits);

function onGetUnits(error, res) {
    if (error) {
        $appWrapper.write('ERROR retrieving units : ', error);
    } else {
        var units = res;
        var ul = document.createElement('ul');
        units.forEach(function(unit) {
            var li = document.createElement('li');
            li.innerHTML = unit;
            ul.appendChild(ul);
        });
        $appWrapper.appendChild(ul);
    }
}


