var sense = sense.init();
var socket = io();
var selectedCard = null;
var currentValue;

jQuery(document).ready(function () {
  var usuario = window.localStorage.getItem('usuario');
  socket.emit('user', usuario);

  var deck = jQuery('.card');
  var raise = jQuery("#btn-raise");
  var call =  jQuery("#btn-call");
  var fold = jQuery("#btn-fold");
  var valueLabel = jQuery("span:contains('Valor da aposta:')");
  var value = jQuery("input[type=text]").hide();
  var submit = jQuery("input[type=submit]").hide();
  var cards = jQuery('.card').draggable();
  var chip = jQuery('.pokerchip').draggable();
  var cards = new Array();

  cards.push(deck[0].outerHTML, deck[1].outerHTML);

  deck.each(function(i, element) {
    jQuery(element)
      .click(function(){
        selectedCard = deck[i];
        alert('Carta selecionada!');
      });
  });

  sense.flick(function(data) {
    //socket.emit('card', selectedCard.outerHTML);
    socket.emit('card', cards);  
  });

  socket.on('update-blinds', function(blinds) {
      currentValue = blinds;
  });



  jQuery("button:contains('Sair')").click(function(){
    jQuery('.card').hide();
    jQuery('.chip').hide();
    raise.hide();
    call.hide();
    fold.hide();
    jQuery("span:contains('Aposta')").hide();  

  });

  call.click(function () {
    console.log('call');
    socket.emit('update', 100);
  });

  fold.click(function () {
    alert('Fold clicado');
    foldf = true;
  });

  submit.click(function() {
    var x = $('#aposta').val();
    socket.emit('raise', x);
    alert('Fez o raise');
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