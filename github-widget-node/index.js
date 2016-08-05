var express = require('express');
var app = express();

var widget = require('./widget.js').widget;



app.set('views', './views');
app.set('view engine', 'ejs');


widget(['kyo4311', 'kriskowal'], function(data) {


    // console.log('over');
    // res.send(data);
});

app.get('/', function(req, res) {
    var query = (req.query.username || '').split(',');


});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});