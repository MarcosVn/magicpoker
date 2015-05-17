function introController ($scope) {
  $scope.menuOptions = [
    { 
      option: 'Jogue agora',
      href: '/client'
     }, 
    { 
      option: 'Campeonato',
      href: '/campeonato'
    }, 
    { 
      option: 'Sala Privada',
      href: '/sala'
    }, 
    { option: 'Selecione o cassino',
      href: '/cassino'
    }, 
    { option: 'Seu perfil',
      href: '/perfil'
    },
    {
      option: 'Exemplo card-fling',
      href: '/table'
    },
  ];

  var activeOption;

  $scope.toggleActive = function (optionName) {
    activeOption = optionName;
  }

  $scope.isActive = function(optionName){
    return optionName == activeOption;
  }
}



