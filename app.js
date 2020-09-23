var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('¡Hello World!');
});

// this event trigger when the connection is successfully with the client
io.on('connection', (socket) => {
  // the event send_emit is for recolect the message (msg) from the client
  socket.on('send_emit', (msg) => {
    // emit the message for the unique socket ang log the message recieve from the client
    console.log("message from client: " + msg);
    socket.emit('emit_message', "LISTO");
    // wait 5 seconds for emit the serial of the client, in this case the socket id for the browser
    setTimeout(function() { socket.emit('emit_message', socket.client.id); }, 5000);
    
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});