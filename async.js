var async = require('async');
var fs = require('fs');

fs.readFile('./a', function(err, data1) {
    fs.readFile('./b', function(err, data2) {
        fs.readFile('./c', function(err, data3) {
            fs.readFile('./d', function(err, data4) {
                // ...
            });
        });
    });
});

async.map(['./a', './b', './c', './d'], function(value, done) {
    fs.readFile(value, 'utf8', done);
}, function(err, result) {
    console.warn(result.join(''));
});
