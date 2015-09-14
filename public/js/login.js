var myApp = angular.module('postgreLogin',[ ]);              
myApp.controller('postgreLoginCtrl', ['$scope' ,'$http', function($scope, $http, $location) {
    $scope.usuario = '';
    $scope.senha = '';
    $scope.email = '';  
    $scope.logged = false;
    $scope.user = null;


    $scope.auth = function() {
        for (var i = 0; i < $scope.dataset.length; i++) {
            if($scope.dataset[i].login == $scope.usuario && $scope.dataset[i].passwd == $scope.senha) {
              $scope.user = $scope.dataset[i];
              return true;
            } 
                
        };
        return false;
    }

    $scope.getAllUsers = function(){ 
        $http({method: 'GET', url: '/db/readUsers'}).
       success(function(data, status) { 
          $scope.dataset = data; 
          console.log($scope.dataset);
      }).
       error(function(data, status) {
          $scope.dataset = data || "Request failed "; 
      }); 
   }

   $scope.login = function() {
        if($scope.auth()){
            $scope.logged = true;
            window.localStorage.setItem('usuario', $scope.usuario);
            window.location = '/magicpoker';
            $scope.$apply();
            $scope.usuario = '';
            $scope.senha = '';

        }
        else {
            alert('Usuário e/ou senha inválidos!');
        }
   }     

    $scope.getAllUsers();                                 
}]); 