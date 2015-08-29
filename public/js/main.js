var myApp = angular.module('myApp', ['cardApp']);
var index = 1;
myApp.service('clientService', function () {
  var chips = [ 
    {
      id: 1,
      color: 'pokerchip chip-blue'
    }, 
    {
      id: 2,
      color: 'pokerchip chip-red'
    },
    {
      id: 3,
      color: 'pokerchip chip-black'
    },
    {
      id: 4,
      color: 'pokerchip chip-white'
    },
    {
      id: 5,
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


