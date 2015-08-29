//var sense = sense.init();
var socket = io();
var currentPot = [];
var state = -1;
var value = $('#value').val();
var cardAudio = document.getElementById('');

$(document).ready(function () {   
  var deck = $('.card').draggable();
  var board = $('.board');

  function showCards() {
      deck.show("slow");
  }

  socket.on('message', function(visitors) {
      document.getElementById('players').innerHTML = visitors - 1;
  });

  /* listener para cartas que são recebidas */
  socket.on('card-broadcast', function(card){
    selectedCard = card;
    board.append(selectedCard)
    //cardAudio.play();
  });

  socket.on('raise-update', function(newValue){
    alert('Chegou');
    value = parseInt(document.getElementById('value').innerHTML) + parseInt(newValue);
    document.getElementById('value').innerHTML = value;  
  });

  socket.on('blinds-update', function(currentValue) {
      alert('Chegou');
      value = parseInt(document.getElementById('value').innerHTML) + currentValue;
      document.getElementById('value').innerHTML = value;  
  });

  
  jQuery('#poker_play_pause').click(function (event) {
  if (Poker.isGamePaused()) {
    Poker.startClock();
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

