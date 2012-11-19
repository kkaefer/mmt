var util = require('util');
var Fruit = require('./fruit.js');


function Banana(weight) {
    Fruit.call(this, weight);
}
util.inherits(Banana, Fruit);
Banana.prototype.calories = 10;

module.exports = Banana;