//var sense = sense.init();
var socket = io();
var currentPot = [];
var state = -1;
var value = $('#value').val();
var cardAudio = document.getElementById('');
var flop = true;
var turn = true;
var onlinePlayers = 0;
var dealer = 0;
var smallBlind = 0;
var bigBlind = 0;
var players = {};
var index = 1;


$(document).ready(function () {   
  var deck = $('.card').draggable().hide();
  var board = $('.board');

  socket.on('message', function(visitors, playerData) {
      onlinePlayers = visitors - 1;
      document.getElementById('players').innerHTML = visitors - 1;
  });

  /* listener para cartas que são recebidas */
  socket.on('card-broadcast', function(card){
    selectedCard = card;
    board.append(selectedCard);
    //cardAudio.play();
  });

  socket.on('player-connected', function(playerData){
      console.log(isOnline(playerData.id));
      if(!isOnline(playerData.id)) {
        if(index <= onlinePlayers) 
          players[index++] = playerData;

        alert(players[1].nickname+' conectou!!');
      }
  });

  socket.on('raise-update', function(newValue){
    if(newValue > 0) {
      value = parseInt(document.getElementById('value').innerHTML) + parseInt(newValue);
      document.getElementById('value').innerHTML = value; 
    }
  });

  /*if(flop) {
    alert('Início do flop!!');
    $('.card:lt(3)').fadeIn(3000);
  }

  if(turn) {
    alert('Início do turn!!');
    $('.card:eq(3)').fadeIn(3000);
  }

  if(river) {
    alert('Início do river!!');
    $('.card:eq(4)').fadeIn(3000);
  }*/

  socket.on('blinds-update', function(currentValue) {
      alert('Chegou');
      value = parseInt(document.getElementById('value').innerHTML) + currentValue;
      document.getElementById('value').innerHTML = value;  
  });


  function isOnline(playerId) {
    for(var player in players) {
      if(players[player].id == playerId) return true;
    }
    return false;
  }

  // função genérica para alternar entre flop, river, turn
  function changeTurn(msg, selector) {
    alert('Início do '+msg+'!!');
    $('.card:'+selector).fadeIn(3000);
  }
  

  jQuery('#poker_play_pause').click(function (event) {
  if (Poker.isGamePaused()) {
    Poker.startClock();
    dealer = Math.floor(Math.random() * (onlinePlayers)) + 1;
    smallBlind = dealer + 1;
    bigBlind = smallBlind + 1;
    alert(dealer);
  } else {
    Poker.stopClock();
  }
  
  Poker.updatePlayPauseButton();
  });

  jQuery('#poker_next_round').on('click', function (event) {
    Poker.startNextRound();
  });

  jQuery('body').on('keypress', function (event) {
    if (Poker.isGamePaused()) {
      Poker.startClock();
    } else {
      Poker.stopClock();
    }
  
    Poker.updatePlayPauseButton();
  });

  jQuery('.reset').on('click', function (event) {
    Poker.reset();
  });
});

