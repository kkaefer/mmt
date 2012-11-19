var argv = require('optimist')
    .demand('port')
    .default('secret', 'secret')
    .argv;


var Storage = require('./sessionstorage');




var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: argv.secret,
    store: new Storage('./sessions')
}));

var items = {
    1: {
        id: 1,
        title: "Lorem",
        body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    4: {
        id: 4,
        title: "Dolor",
        body: "Chambray dolor quinoa lo-fi. Pitchfork seitan portland pariatur cardigan. Cred officia ea scenester cillum narwhal. Officia ad odd future, labore voluptate mustache sed vegan proident fingerstache. Viral retro VHS commodo nesciunt, fap swag sapiente. Pork belly vice scenester authentic. Dolor occupy placeat, pork belly skateboard nisi helvetica farm-to-table id incididunt carles Austin viral."
    }
};

var counter = 4;


app.get('/favicon.ico', function(req, res) {
    res.sendfile('./favicon.png');
});

app.get('/api/items', function(req, res) {
    res.json(items);
});

app.param('recipe', function(req, res, next, id) {
    if (items[id]) {
        next();
    } else {
        res.status(404).end();
    }
});


app.get('/api/item/:id(\\d+)', function(req, res) {
    res.json(items[req.params.id]);
});

app.post('/api/item', function(req, res) {
    var id = ++counter;
    items[id] = req.body;
    items[id].id = id;
    res.json({ id: id });
});

app.put('/api/recipe/:recipe', function(req, res) {
    var id = req.params.id;
    items[id] = req.body;
    items[id].id = id;
    res.json({ id: id });
});

app.del('/api/item/:id', function(req, res) {
    var id = req.params.id;
    delete items[id];
    res.status(200).end();
});

app.use('/assets/hidden', express.basicAuth('user', 'pass'));

app.get('/assets/hidden', function(req, res) {
    res.send("secret!");
});

app.use('/assets', express.static('./assets'));

app.engine('jade', require('jade').__express);
app.set('views', './templates');

app.get('/items', function(req, res) {
    res.render('items.jade', {
        title: "Items",
        items: items
    });
});


app.get('/item/:id', function(req, res) {
    var item = items[req.params.id];
    if (req.session.counter) req.session.counter++;
    else req.session.counter = 1;
    res.render('page.jade', {
        title: item.title,
        body: item.body,
        counter: req.session.counter
    });
});

app.listen(argv.port);
