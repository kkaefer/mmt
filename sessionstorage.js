var util = require('util');
var express = require('express');
var fs = require('fs');

function Storage(root) {
    this.root = root;
}
util.inherits(Storage, express.session.Store);
module.exports = Storage;

Storage.prototype.get = function(sid, done) {
    // Read file from disk
    fs.readFile(this.root + '/' + sid, function(err, data) {
        if (err) return done(err);
        done(null, JSON.parse(data));
    });
};

Storage.prototype.set = function(sid, session, done) {
    // write file to disk
    var data = JSON.stringify(session);
    fs.writeFile(this.root + '/' + sid, data, done);
};

Storage.prototype.destroy = function(sid, done) {
    done(null);
};
