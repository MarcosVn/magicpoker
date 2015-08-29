var sense = sense.init();
var socket = io();
var selectedCard;
var currentValue;

function fold() {

}

function call() {

}


function turnDown() {
  jQuery(selectedCard).empty();
}

/* guarda a posição da carta ao selecionar */  
jQuery(document).ready(function () {
  var deck = jQuery('.card');
  var firstCard = jQuery('#card-one');
  var secondCard = jQuery('#card-two');
  var raise = jQuery("#btn-raise");
  var call =  jQuery("#btn-call");
  var fold = jQuery("#btn-fold")
  var valueLabel = jQuery("span:contains('Valor da aposta:')");
  var value = jQuery("input[type=text]").hide();
  var submit = jQuery("input[type=submit]").hide();
  var cards = jQuery('.card').draggable();
  var chip = jQuery('.pokerchip').draggable();


  deck.each(function(i, element) {
    jQuery(element)
      .click(function(){
        selectedCard = deck[i];
        alert('Carta selecionada!');
        })
    });

  /* Detecta o movimento de flick (chicotada) e faz o broadcast da cor selcionada */
  /* Ação Fold */
  sense.flick(function(data){
    socket.emit('card', selectedCard.outerHTML);
    turnDown();  
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
  });

  submit.click(function() {
    var x = $('#aposta').val();
    socket.emit('raise', x);
    alert('Mandou');
  });

  raise.click(function() {
    function raise(value) {
      currentValue = currentValue - value;
      alert('Aposta feita!');
    }
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