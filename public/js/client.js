var sense = sense.init();
var socket = io();
var deck = $('.card');
var firstCard = $('#card-one');
var secondCard = $('#card-two');
var selectedCard;


function turnDown() {
  $(selectedCard).empty();
}

/* guarda a posição da carta no click */  
$(document).ready(function () {
  deck.each(function(i, element) {
    $(element)
      .click(function(){
        selectedCard = deck[i];
        alert('Seleciou a' +selectedCard);
        })
    });

  /* Detecta o movimento de flick (chicotada) e faz o broadcast da cor selcionada */
  sense.flick(function(data){
    socket.emit('card', selectedCard.outerHTML);
    turnDown();  
  });
});



/* listener para cartas que são recebidas 
socket.on('card-broadcast', function(card){
  secondCard.empty();
  selectedCard = card;
  alert('Chegou a: '+selectedCard)
  secondCard.append(selectedCard)
  //secondCard.replaceWith(selectedCard);
});
*/