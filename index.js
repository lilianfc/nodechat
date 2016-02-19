var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/styles', express.static(__dirname + '/views/styles/'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket) {
	//console.log('a user connected');
	socket.on('disconnect', function(msg) {
		io.emit('disconnected', msg);
	});
	socket.on('chat message', function(msg) {
		//console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('login', function(msg) {
		io.emit('connected', msg);
	});
});

http.listen(5000, function() {
	console.log('listening on *:5000');
});
