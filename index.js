var app = require('express')();
var http = require('http').Server(app);
var server = app.listen(3000, function() {
  console.log('Listening on *:3000');
});
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connect', function(socket) {
  console.log('User\'s connected...');
  socket.on('chat message', function(msg) {
    console.log('User: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    console.log('User\s disconnect');
  });
});
