var sense = sense.init();
var socket = io();
var selectedCard = null,
    currentValue = 0;
var userData = {},
    cards = [];

$(document).ready(function () {
  var deck = $('.card').draggable();
  var chip = $('.pokerchip').draggable();

  var raise = $('#btn-raise'),
      call  = $('#btn-call'),
      fold  = $('#btn-fold');

  var submit = $('input[type=submit]').hide(),
      aposta = $('#aposta').hide(),
      blinds = $('#bblind').hide();

  var apostar = $('#btnaposta'),
      valorAposta = $('#blind');

  var sair = $('#leave');
  var user = window.localStorage.getItem('usuario');

  ncards = {one: fcards[0], two: fcards[1]};
  socket.emit('user', {nickname: user, deck: ncards});
  cards.push(deck[0].outerHTML, deck[1].outerHTML);




  socket.on('update-blinds', function(blinds) {
      currentValue = blinds;
  });

  socket.on('pflop', function(preFlopData){
      alert('Pré-flop');
  });

  socket.on('sblind', function() {
    alert('Você é o small blind, faça sua aposta!');
    blinds.show();
    blinds.focus();
  });

  socket.on('bblind', function() {
    alert('Você é o big blind, faça sua aposta!');
    blinds.show();
    blinds.focus();
  });

  apostar.click(function() {
    socket.emit('update', valorAposta.val());
  });

  sense.flick(function(data) {
    socket.emit('card', {nickname : user,
                  cardList: cards});  
  });

  fold.click(function() {
    alert('Faça o gesto de lançar as cartas sobre a mesa!');
  });

  call.click(function() {
    socket.emit('update', currentValue);
  });

  submit.click(function() {
    socket.emit('raise', aposta.val());
  });

  sair.click(function(){
    deck.hide();
    pokerchip.hide();
    raise.hide();
    call.hide();
    fold.hide(); 
  });
});
