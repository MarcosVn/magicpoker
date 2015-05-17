var myApp = angular.module('myApp', ['cardApp']);

myApp.service('clientService', function () {
  var chips = [ 
    {
      color: 'pokerchip chip-blue'
    }, 
    {
      color: 'pokerchip chip-red'
    },
    {
      color: 'pokerchip chip-black'
    },
    {
      color: 'pokerchip chip-white'
    },
    {
      color: 'pokerchip chip-green'
    }
  ];

  var enter = false;
  var btnToolbar = true;

  this.getEnter = function() {
    return enter;
  };

  this.getBtnToolbar = function() {
    return btnToolbar
  };

  this.getChips = function() {
    return chips;
  };

  this.aggregateVals = function() {
    var all = 0;
    for (var i = 0; i < chips.length; i++) {
      all += chips[i].val;
    }
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
  var raise = jQuery("#btn-raise");
  var call =  jQuery("#btn-call");
  var fold = jQuery("#btn-fold")
  var valueLabel = jQuery("span:contains('Valor da aposta:')");
  var value = jQuery("input[type=text]").hide();
  var submit = jQuery("input[type=submit]").hide();
  var cards = jQuery('.card').draggable();
  var chip = jQuery('.pokerchip').draggable();



  jQuery("button:contains('Sair')").click(function(){
    jQuery('.card').hide();
    jQuery('.chip').hide();
    raise.hide();
    call.hide();
    fold.hide();
    jQuery("span:contains('Aposta')").hide();  

  });

  call.click(function () {
    chip.hide("slow");
  });

  fold.click(function () {
    alert('Fez o fold');
  });

  raise.click(function () {
  });
});

