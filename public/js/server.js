var socket = io();
var currentPot = [];
var state = -1;
var value = $('#value').val();
var cardAudio = document.getElementById('cardFlip');
var flop = true;
var turn = true;
var onlinePlayers = 0;
var dealer = 0;
var smallBlind = 0;
var bigBlind = 0;
var players = {};
var index = 1;
var id = 0;


$(document).ready(function () {   
  //var deck = $('.card').hide();
  var board = $('.board');
  console.log(players);

  if(onlinePlayers < 2) {
    $('#poker_play_pause').attr('disabled', 'disabled');
  }

  socket.on('message', function(visitors, playerData) {
      onlinePlayers = visitors - 1;
      document.getElementById('players').innerHTML = visitors - 1;

      if(onlinePlayers > 2) {
        $('#poker_play_pause').removeAttr('disabled');
      }
  });

  socket.on('user-logged', function(user) {
    if(!isOnline(user)) {
      players[index++] = {id: user};
      id++;
    }
    updatePlayersName(players);
  });


  socket.on('card-broadcast', function(card){
    board.append(card[0]);
    board.append(card[1]);
    cardAudio.play();
  });


  socket.on('raise-update', function(newValue){
    if(newValue > 0) {
      value = parseInt(document.getElementById('value').innerHTML) + parseInt(newValue);
      document.getElementById('value').innerHTML = value; 
    }
  });

  socket.on('end-turn', function (flag) {
    f = flag;
    if(flag == 'F') {
      changeTurn('lt(3)');
    }
    else if (flag == 'T') {
      changeTurn('eq(4)');
    }

    else {
      changeTurn('eq(4)');  
    }
  });

  socket.on('blinds-update', function(currentValue) {
      alert('Chegou');
      value = parseInt(document.getElementById('value').innerHTML) + currentValue;
      document.getElementById('value').innerHTML = value;  
  });


  function isOnline(user) {
    for(var player in players) {
      if(players[player].id == user) return true;
    }
    return false;
  }

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

