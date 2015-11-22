var socket = io();
var value = $('#value').val();
var onlinePlayers = 0;
var dealer = 0;
var smallBlind = 0;
var bigBlind = 0;
var playersIndex = 1;
var players = [];
var sortedIndexes = [];

$(document).ready(function () {   
  var deck = $('.card');
  var startButton = $('#poker_play_pause').hide();
  var board = $('.board');

  sortedIndexes = sorted;

  socket.on('user-logged', function(userData){
      players.push({id: playersIndex++, data: userData});
  });

  socket.on('message', function(visitors) {
      onlinePlayers = visitors - 1;
      document.getElementById('players').innerHTML = visitors - 1;
      if(onlinePlayers >= 2) {
        $('#poker_play_pause').show();
        $('#cantstart').hide();
      }
  });

  socket.on('card-broadcast', function(card){
    console.log(card);
    board.append(card[0]);
    board.append(card[1]);
  });

  socket.on('raise-update', function(newValue){
    if(newValue > 0) {
      value = parseInt(document.getElementById('value').innerHTML) + parseInt(newValue);
      document.getElementById('value').innerHTML = value; 
    }
  });

  socket.on('end-turn', function (flag) {
    f = flag;
    if(flag == 'F') changeTurn('lt(3)');
    else if (flag == 'T') changeTurn('eq(4)');
    else changeTurn('eq(4)');  
  });

  socket.on('blinds-update', function(currentValue) {
      value = parseInt(document.getElementById('value').innerHTML) + currentValue;
      document.getElementById('value').innerHTML = value;  
  });

  function changeTurn(msg, selector) {
    alert('Início do '+msg+'!!');
    $('.card:'+selector).fadeIn(3000);
  }
  
  jQuery('#poker_play_pause').click(function (event) {
    event.preventDefault();
    if (Poker.isGamePaused()) {
      Poker.startClock();
      dealer = Math.floor(Math.random() * (onlinePlayers - 1)) + 1;
      smallBlind = (dealer + 1) % players.length;
      bigBlind = (dealer + 2) % players.length;

      socket.emit('pre-flop', {sorted: sortedIndexes, player: players[dealer].data.id});
      socket.emit('sblind', {id: (players[dealer.id + 1]) % players.length,
            data: players[smallBlind].data.id});
      socket.emit('bblind', {id: (players[dealer.id + 2]) % players.length,
            data: players[bigBlind].data.id});
    } 
    else Poker.stopClock();
    Poker.updatePlayPauseButton();
  });

  jQuery('#poker_next_round').on('click', function (event) {
      Poker.startNextRound();
  });

  jQuery('.reset').on('click', function (event) {
    Poker.reset();
  });
});

