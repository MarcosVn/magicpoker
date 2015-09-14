var myApp = angular.module('postgreSQL',[ ]);              
myApp.controller('postgreSQLCtrl', ['$scope' ,'$http',  function($scope, $http) {  
    $scope.usuario = window.localStorage.getItem('usuario') || '';
    $scope.senha = '';
    $scope.email = '';  
    $scope.logged = true;
    $scope.userData = '';

    if($scope.usuario != '' || $scope.usuario != null) {
        $http({method: 'GET', url: '/db/getUser?nickname='+$scope.usuario}).
        success(function(data, status) {
            $scope.senha = data[0].passwd;
            $scope.email = data[0].email;  
        });
    }

    $scope.alreadyExists = function() {
        console.log('entrou');
        for (var i = 0; i < $scope.dataset.length; i++) {
            if($scope.dataset[i].login == $scope.usuario) return true;
        };
        return false;
    }

    $scope.getAllUsers = function(){ 
        $http({method: 'GET', url: '/db/readUsers'}).
       success(function(data, status) { 
          $scope.dataset = data;
      }).
       error(function(data, status) {
          $scope.dataset = data || "Request failed "; 
      }); 
   }     

    $scope.addUser = function(){ 
        if($scope.usuario != '' && $scope.senha != '')
        {
            if(!$scope.alreadyExists()) {

            $http({method: 'GET', url: '/db/addUser?usuario='+$scope.usuario+'&senha='+
               $scope.senha+'&email='+$scope.email+'&logged='+$scope.logged}).
            success(function(data, status) { 
                alert('Cadastro realizado com sucesso!');
                $scope.usuario = '';
                $scope.senha = '';
                $scope.email = '';
                jQuery('input').val('');
            });
            }
            else {
                alert('O usuário já existe no sistema');
            }
        }
        else {
            alert('Preencha todos os campos corretamente')
        }  
    }                
        $scope.delUser = function(recId){
            console.log(recId);
            if(confirm('Você deseja realmente deletar a sua conta ? '))
            {
                $http({method: 'GET', url: '/db/delRecord?id='+recId}).
                success(function(data, status) {  
                    $scope.getAllRec();
                });
            }
        }
        $scope.getAllUsers();                                 
}]); 

