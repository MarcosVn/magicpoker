var cardApp = angular.module('cardApp', []);

cardApp.directive('deckcard', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/card/html/card.html',
        scope: {
        	number: "=?"
        },

        controller : function($scope){
        	console.log($scope.number)
        }
    };
});


