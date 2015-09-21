function handController ($scope) {
  $scope.contains = false;
  $scope.allCards = [
    { 
      id: 1,
      style: 'card ace_clubs'  
    },
    { 
      id: 2,
      style: 'card two_clubs'   
    },
    { 
      id: 3,
      style: 'card three_clubs'   
    },
    { 
      id: 4,
      style: 'card four_clubs' 
    }, 
    { 
      id: 5,
      style: 'card five_clubs'
    },
    { 
      id: 6,
      style: 'card six_clubs'
    },
    { 
      id: 7,
      style: 'card seven_clubs'
    },
    { 
      id: 8,
      style: 'card eight_clubs'
    },
    { 
      id: 9,
      style: 'card nine_clubs'
    },
    { 
      id: 10,
      style: 'card ten_clubs'
    },
    { 
      id: 11,
      style: 'card jack_clubs'
    },
    { 
      id: 12,
      style: 'card queen_clubs'
    },
    { 
      id: 13,
      style: 'card king_clubs'
    },
    { 
      id: 14,
      style: 'card ace_hearts'   
    },
    { 
      id: 15,
      style: 'card two_hearts'
    },
    { 
      id: 16,
      style: 'card three_hearts'  
    },
    { 
      id: 17,
      style: 'card four_hearts'  
    },
    { 
      id: 18,
      style:  'card five_hearts' 
    },
    { 
      id: 19,
      style:   'card six_hearts' 
    },
    { 
      id: 20,
      style:  'card seven_hearts' 
    },
    { 
      id: 21,
      style:   'card eight_hearts' 
    },
    { 
      id: 22,
      style:   'card nine_hearts' 
    },
    { 
      id: 23,
      style:   'card ten_hearts' 
    },
    { 
      id: 24,
      style: 'card jack_hearts'    
    },
    { 
      id: 25,
      style:  'card queen_hearts'   
    },
    { 
      id: 26,
      style:  'card king_hearts'  
    },
    { 
      id: 27,
      style:  'card ace_spades'  
    },

    { 
      id: 28,
      style:  'card two_spades'   
    },
    { 
      id: 29,
      style: 'card three_spades'   
    },
    { 
      id: 30,
      style:  'card four_spades'   
    },
    { 
      id: 31,
      style:  'card five_spades'   
    },
    { 
      id: 32,
      style:  'card six_spades'   
    },
    { 
      id: 33,
      style:  'card seven_spades'   
    },
    { 
      id: 34,
      style:   'card eight_spades'  
    },
    { 
      id: 35,
      style:  'card nine_spades'   
    },
    { 
      id: 36,
      style:   'card ten_spades'  
    },
    { 
      id: 37,
      style:  'card jack_spades'   
    },
    { 
      id: 38,
      style: 'card queen_spades'   
    },
    { 
      id: 39,
      style: 'card king_spades'   
    },
    { 
      id: 40,
      style: 'card ace_diamonds'    
    },
    { 
      id: 41,
      style: 'card two_diamonds' 
    },
    { 
      id: 42,
      style: 'three_diamonds' 
    },
    { 
      id: 43,
      style: 'card four_diamonds'  
    },
    { 
      id: 44,
      style: 'card five_diamonds' 
    },
    { 
      id: 45,
      style: 'card six_diamonds' 
    },
    { 
      id: 46,
      style: 'card seven_diamonds'  
    },
    { 
      id: 47,
      style: 'card eight_diamonds' 
    },
    { 
      id: 48,
      style: 'card nine_diamonds'  
    },
    { 
      id: 49,
      style: 'card ten_diamonds' 
    },
    { 
      id: 50,
      style: 'card jack_diamonds'  
    },
    { 
      id: 51,
      style: 'card queen_diamonds'  
    },
    { 
      id: 52,
      style: 'card king_diamonds'   
    }
  ];


  $scope.sortedCards = [];


  $scope.selectGameCards = function($scope) {
    while($scope.sortedCards.length < 2)
    {
      var random = Math.floor(Math.random() * ($scope.allCards.length));
      
      for (var j = 0; j < $scope.sortedCards.length; j++) {
          if($scope.sortedCards[j].id == random) $scope.contains = true;
      };

      if(!$scope.contains) {
        $scope.sortedCards.push({ id: random, style: $scope.allCards[random].style });  
      }

      $scope.contains = false;
    }
    return $scope.sortedCards;
  }

  $scope.sortedCards = $scope.selectGameCards($scope);
  console.log($scope.sortedCards);

}



