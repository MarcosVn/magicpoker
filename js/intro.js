function introController ($scope) {
  $scope.menuOptions = [
    { 
      option: 'Jogue agora',
      href: 'templates/match.html'
     }, 
    { 
      option: 'Campeonato',
      href: 'templates/campeonato.html'
    }, 
    { 
      option: 'Sala Privada',
      href: 'templates/sala.html'
    }, 
    { option: 'Selecione o cassino',
      href: 'templates/cassino.html'
    }, 
    { option: 'Seu perfil',
      href: 'templates/perfil.html'
    },
    {
      option: 'Exemplo color-fling',
      href: 'examples/color_fling.html'
    }
  ];

  var activeOption;

  $scope.toggleActive = function (optionName) {
    activeOption = optionName;
  }

  $scope.isActive = function(optionName){
    return optionName == activeOption;
  }
}



