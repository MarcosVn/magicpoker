var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
});

mongoose.connect('mongodb://localhost/test');


var passport = require('passport');
//var dbConfig = require('./db.js');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var visitors = 0;


io.on('connection', function(socket){
  console.log('a user connected');
  visitors++;
  socket.emit('message', visitors);
  socket.broadcast.emit('message', visitors);

   
   socket.on('newplayer', function(playerData){
      socket.broadcast.emit('player-connected', playerData);  
   });

   socket.on('disconnect', function(){
      visitors--;
      socket.broadcast.emit('message', visitors);
   });


  /* Definição do listener para envio da carta client - server */
  socket.on('card', function(card){
    io.emit('card-broadcast', card)
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


//mongoose.connect(dbConfig.url);


//app.use(expressSession({secret: 'minhaChaveSecreta'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var Schema = mongoose.Schema;
 
var contatoSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = app;
