var util = require('util');

function Fruit() {

}
util.inherits(Fruit, process.EventEmitter);
Fruit.prototype.bite = function() {
    this.emit('bite');
};

////

var banana = new Fruit();
banana.on('bite', function() {
    console.warn('Someone ate me!');
});

banana.bite();