var sense = sense.init();
var socket = io();
var selectedCard = null,
    currentBet = 0;
var userData = {},
    cards = [];
var text;
window.SpeechRecognition = window.SpeechRecognition       ||
                           window.webkitSpeechRecognition ||
                           null;

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

  var sair = $('#leave'),
      gravar = $('#gravar');

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

  socket.on('', function(newValue) {
      currentBet = newValue;
  });

  apostar.click(function() {
    socket.emit('update', valorAposta.val());
    blinds.hide();
  });

  sense.flick(function(data) {
    socket.emit('card', {nickname : user,
                  cardList: cards});  
  });

  fold.click(function() {
    alert('Faça o gesto de lançar as cartas sobre a mesa!');
  });

  call.click(function() {
    socket.emit('update', currentBet);
  });

  submit.click(function() {
    var bet = aposta.val();
    if(bet > currentBet)
      socket.emit('raise', aposta.val());
    else
      alert('Você precisa subir a aposta da mesa!');
  });

  sair.click(function(){
    window.location = "/magicpoker"; 
  });
                      
  if (window.SpeechRecognition != null) {
      var recognizer = new window.SpeechRecognition();
      recognizer.lang = 'pt-BR';
      recognizer.continuous = true;

      recognizer.onresult = function(event){
          text = '';
          for (var i = event.resultIndex; i < event.results.length; i++) {
              if(event.results[i].isFinal) {
                text = ""+event.results[i][0].transcript;
                text = text.trim().toLowerCase();

                text = text.split(' ');
                alert(text);
                if(text == "correr" || text == "corre") {
                    alert(text);
                    socket.emit('card', {nickname : user,
                                cardList: cards});  
                }

                else if(text[0] == 'pagar' || text[0] == 'paga') 
                  socket.emit('update', currentBet);
                
                else if(text[0] == 'aumentar' || text[0] == 'aumenta') {
                  if(text[1] > currentBet)
                    socket.emit('raise', text[1]);
                  else
                    alert('Você precisa subir a aposta da mesa!');
                }
                  
                  
                else if(text == 'apostar' || text == 'aposta') 
                  socket.emit('update', text[1]);
                
              }
              
              else {
                console.log('texto não identificado');
              }
              
            }
      }
          
      document.querySelector("#gravar").addEventListener("click", function(){
        recognizer.start();
      });
  }





});
