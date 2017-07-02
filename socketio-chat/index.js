var express     = require('express');
var http        = require('http');

var app         = express();
var server      = http.Server(app);
var io          = require('socket.io')(server);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
    // io.emit('user connected', JSON.stringify(msg));
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnect');
  });
  socket.on('user connected',function(nickName){
    console.log('user connected:',nickName);
    io.emit('other user connected', nickName);
  })
  socket.on('msg new', function(msg){
    console.log('message: ' + msg);
    msg = JSON.parse(msg);
    msg.processed = true;
    setTimeout(()=>{
      io.emit('msg received', JSON.stringify(msg));
    }, 500)
   })
    socket.on('typing', function(nickName){
     console.log(`user ${nickName} is typing`);
     socket.broadcast.emit('user typing',nickName);
  });
});


server.listen(3000, function(){
  console.log('listening on *:3000');
});