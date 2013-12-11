var Units = require('./Models/Units');
var UnitComparisonView = require('./Views/unitComparison');


var $appWrapper = document.getElementById('app-wrapper');

// In router
var view = new UnitComparisonView($appWrapper, Units.all());