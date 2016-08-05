var express = require('express');
var app = express();
var widget = require('./widget.js').widget;
var open = require("open");


app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {

    var query = (req.query.username || '').split(',') || ['kyo4311'];

    widget(query, function(data) {
        res.render('index', {
            data: {
                list: data
            }
        });
    });

});

var server = app.listen(3000, function() {
    open("http://127.0.0.1:3000?username=kyo4311,tj,expressjs");
});