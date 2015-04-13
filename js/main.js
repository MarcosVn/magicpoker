var myApp = angular.module('myApp', []);

myApp.service('clientService', function () {
  var chips = [ 
    {
      color: 'blue',
      val: 10,
    }, 
    {
      color: 'blue',
      val: 20,
    }
  ];

  var enter = false;
  var btnToolbar = true;

  this.getEnter = function() {
    return enter;
  }

  this.getBtnToolbar = function() {
    return btnToolbar
  }

  this.getChips = function () {
    return chips;
  }

  this.aggregateVals = function() {
    var all = 0;
    for (var i = 0; i < chips.length; i++) {
      all += chips[i].val;
    };
    return all;
  }
});


myApp.controller('chipsController', function chipsController($scope, clientService) {
  $scope.chips = clientService.getChips();

  $scope.all = function () {
    return clientService.aggregateVals();
  };

  $scope.entrar = clientService.getEnter();
  $scope.btnToolbar = clientService.getBtnToolbar();
});


jQuery(document).ready(function () {
  jQuery('.card').hide();
  jQuery('.chip').hide();
  jQuery('span').hide();
  var raise = jQuery("button:contains('Raise')").hide();
  var call =  jQuery("button:contains('Call')").hide();
  var fold = jQuery("button:contains('Fold')").hide();
  var valueLabel = jQuery("span:contains('Valor da aposta:')");
  var value = jQuery("input[type=text]").hide();
  var submit = jQuery("input[type=submit]").hide();
 
  jQuery("button:contains('Entrar')").click(function (){
      jQuery('.card').draggable();
      jQuery('.chip').draggable();
      jQuery('body').addClass('background');
      jQuery('.chip').show("slow");
      jQuery('span').show("slow");
      jQuery('.card').show("slow");
      raise.show("slow");
      call.show("slow");
      fold.show("slow");
  });

  jQuery("button:contains('Sair')").click(function(){
    jQuery('.card').hide();
    jQuery('.chip').hide();
    raise.hide();
    call.hide();
    fold.hide();
    jQuery('body').removeClass('background');
  });

  call.click(function () {
    jQuery('.chip').hide("slow");
  });

  fold.click(function () {
    alert('Fez o fold');
  });

});


/*var sense = sense.init();
    var socket = io();
    var colors = [
      "#33B5E5",
      "#AA66CC",
      "#99CC00",
      "#FFBB33",
      "#FF4444"
    ];

    var cards = [


    ];

    var selectedColor = colors[0];
    sense.flick(function(data){
      broadcast();
    });
    $(document).ready(function(){
      $('.option').each(function(i, element){
        $(element)
            .css({"background": colors[i]})
            .click(function(){
              $('body').css({"background": colors[i]});
              selectedColor = colors[i]
            })
      })
    });
    function broadcast(){
      socket.emit('color', selectedColor)
      //socket.emit('card', selectedCard)
    }
    socket.on('color-broadcast', function(color){
      selectedColor = color;
      $('body').css({"background": selectedColor});
    })

*/