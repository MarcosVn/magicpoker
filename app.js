var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var visitors = 0;
var clients = [];

io.on('connection', function(socket){
  visitors++;
  console.info('New client connected (id=' + socket.id + ').');

  socket.emit('message', visitors);
  socket.broadcast.emit('message', visitors);

  clients.push(socket);
   
   socket.on('newplayer', function(playerData){
      socket.broadcast.emit('player-connected', playerData);  
   });

   socket.on('disconnect', function(){
      visitors--;
      socket.broadcast.emit('message', visitors);
   });

   socket.on('update-client', function(newValue)) {
      socket.emit()

   }

   socket.on('pre-flop', function(preFlopData){
      io.sockets.connected[preFlopData.player].emit('pflop', preFlopData.sorted);
   });

   socket.on('sblind', function(socket) {
      console.info('definicao do small-blind');
      io.sockets.connected[socket.data].emit('sblind', 'small-blind');
   });

   socket.on('bblind', function(socket) {
      console.info('definicao do big-blind');
      io.sockets.connected[socket.data].emit('bblind', 'big-blind');
   });

  socket.on('user', function(user) {
    var userData = {id: socket.id, data: user};
    io.emit('user-logged', userData);
  });

  /* Definição do listener para envio da carta client - server */
  socket.on('card', function(cardData){
    io.emit('card-broadcast', cardData);
  });

  /* Definição do listener para update dos valores de aposta server - client */
  socket.on('update', function(currentValue){
  	io.emit('blinds-update', currentValue);
  });

  socket.on('raise', function(newValue){
    io.emit('raise-update', newValue);
  });

});

server.listen(8000, function(){
  console.log('Servidor escutando na porta 8000');
});


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
