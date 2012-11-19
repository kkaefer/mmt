var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req, res) {
    var uri = url.parse(req.url);
    console.warn(uri);
    if (uri.pathname == '/favicon.ico') {
        // Send favicon
        var favicon = fs.readFileSync('./favicon.png');
        res.setHeader('Content-Type', 'image/png');
        res.write(favicon);
        res.end();
    } else {
        // Send Hello World
        res.write('Hello World');
        res.end();
    }
});

app.listen(8001);
