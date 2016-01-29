var http = require('http');
var app = require('./app');
var port = process.env.PORT || 3000;
app.set('port', port);
//
var server = http.createServer(app);

//server.listen(port, 'localhost');
server.listen(app.get('port'), function() {
    console.log("server listening on port: " + app.get('port'));
});

//app.listen(port);
console.log("Welcome to Fitheart!");