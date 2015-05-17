var sense = sense.init();
var socket = io();
var deck = $('.card');
var board = $('.board');
var selectedCard;

/* Detecta o movimento de flick (chicotada) e faz o broadcast da cor selcionada /
sense.flick(function(data){
  socket.emit('card', selectedCard.outerHTML);
});
*/

/* guarda a posição da carta no click */  
$(document).ready(function () {
  deck.each(function(i, element) {
    $(element)
      .click(function(){
        selectedCard = deck[i];
        console.log("Vc seleciou a : "+selectedCard);
        })
    });

  /* listener para cartas que são recebidas */
  socket.on('card-broadcast', function(card){
    selectedCard = card;
    console.log('Chegou a: '+selectedCard)
    board.append(selectedCard)
  });
});
