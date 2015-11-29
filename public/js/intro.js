function introController ($scope) {
  $scope.menuOptions = [
    { 
      option: 'Jogue agora',
      href: '/client',
      clas: 'glyphicon glyphicon-flash'
     }, 
    { 
      option: 'Campeonato',
      href: '/campeonato',
      clas: 'glyphicon glyphicon-gift'
    }, 
    { 
      option: 'Sala Privada',
      href: '/sala',
      clas: 'glyphicon glyphicon-lock'
    }, 
    { option: 'Seu perfil',
      href: '/perfil',
      clas: 'glyphicon glyphicon-user'
    },
    {
      option: 'Servidor',
      href: '/table',
      style: 'visibility: hidden'
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



