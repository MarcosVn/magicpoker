var fcards = [];

function handController ($scope) {
  $scope.contains = false;
  $scope.allCards = [
    { 
      id: 1,
      style: 'card ace_clubs',
      cs: 14,
      ss: 8  
    },
    { 
      id: 2,
      style: 'card two_clubs',
      cs: 2,
      ss: 8   
    },
    { 
      id: 3,
      style: 'card three_clubs',
      cs: 3,
      ss: 8    
    },
    { 
      id: 4,
      style: 'card four_clubs', 
      cs: 4,
      ss: 8 
    }, 
    { 
      id: 5,
      style: 'card five_clubs',
      cs: 5,
      ss: 8 
    },
    { 
      id: 6,
      style: 'card six_clubs',
      cs: 6,
      ss: 8 
    },
    { 
      id: 7,
      style: 'card seven_clubs',
      cs: 7,
      ss: 8
          
    },
    { 
      id: 8,
      style: 'card eight_clubs',
      cs: 8,
      ss: 8
    },
    { 
      id: 9,
      style: 'card nine_clubs',
      cs: 9,
      ss: 8
    },
    { 
      id: 10,
      style: 'card ten_clubs',
      cs: 10,
      ss: 8
    },
    { 
      id: 11,
      style: 'card jack_clubs',
      cs: 11,
      ss: 8
    },
    { 
      id: 12,
      style: 'card queen_clubs',
      cs: 12,
      ss: 8
    },
    { 
      id: 13,
      style: 'card king_clubs',
      cs: 13,
      ss: 8
    },
    { 
      id: 14,
      style: 'card ace_hearts',
      cs: 14,
      ss: 32   
    },
    { 
      id: 15,
      style: 'card two_hearts',
      cs: 2,
      ss: 32
    },
    { 
      id: 16,
      style: 'card three_hearts',
      cs: 3,
      ss: 32  
    },
    { 
      id: 17,
      style: 'card four_hearts',
      cs: 4,
      ss: 32  
    },
    { 
      id: 18,
      style:  'card five_hearts',
      cs: 5,
      ss: 32 
    },
    { 
      id: 19,
      style:   'card six_hearts',
      cs: 6,
      ss: 32 
    },
    { 
      id: 20,
      style:  'card seven_hearts',
      cs: 7,
      ss: 32 
    },
    { 
      id: 21,
      style:   'card eight_hearts',
      cs: 8,
      ss: 32 
    },
    { 
      id: 22,
      style:   'card nine_hearts',
      cs: 9,
      ss: 32 
    },
    { 
      id: 23,
      style:   'card ten_hearts',
      cs: 10,
      ss: 32 
    },
    { 
      id: 24,
      style: 'card jack_hearts',
      cs: 11,
      ss: 32    
    },
    { 
      id: 25,
      style:  'card queen_hearts',
      cs: 12,
      ss: 32   
    },
    { 
      id: 26,
      style:  'card king_hearts',
      cs: 13,
      ss: 32  
    },
    { 
      id: 27,
      style:  'card ace_spades',
      cs: 14,
      ss: 1  
    },

    { 
      id: 28,
      style:  'card two_spades',
      cs: 2,
      ss: 1   
    },
    { 
      id: 29,
      style: 'card three_spades',
      cs: 3,
      ss: 1   
    },
    { 
      id: 30,
      style:  'card four_spades',
      cs: 4,
      ss: 1   
    },
    { 
      id: 31,
      style:  'card five_spades',
      cs: 5,
      ss: 1   
    },
    { 
      id: 32,
      style:  'card six_spades',
      cs: 6,
      ss: 1   
    },
    { 
      id: 33,
      style:  'card seven_spades',
      cs: 7,
      ss: 1   
    },
    { 
      id: 34,
      style:   'card eight_spades',
      cs: 8,
      ss: 1  
    },
    { 
      id: 35,
      style:  'card nine_spades',
      cs: 9,
      ss: 1   
    },
    { 
      id: 36,
      style:   'card ten_spades', 
      cs: 10,
      ss: 1 
    },
    { 
      id: 37,
      style:  'card jack_spades',
      cs: 11,
      ss: 1   
    },
    { 
      id: 38,
      style: 'card queen_spades',
      cs: 12,
      ss: 1   
    },
    { 
      id: 39,
      style: 'card king_spades',
      cs: 13,
      ss: 1   
    },
    { 
      id: 40,
      style: 'card ace_diamonds',
      cs: 14,
      ss: 2    
    },
    { 
      id: 41,
      style: 'card two_diamonds',
      cs: 2,
      ss: 2 
    },
    { 
      id: 42,
      style: 'card three_diamonds',
      cs: 3,
      ss: 2 
    },
    { 
      id: 43,
      style: 'card four_diamonds',
      cs: 4,
      ss: 2  
    },
    { 
      id: 44,
      style: 'card five_diamonds',
      cs: 5,
      ss: 2 
    },
    { 
      id: 45,
      style: 'card six_diamonds',
      cs: 6,
      ss: 2 
    },
    { 
      id: 46,
      style: 'card seven_diamonds',
      cs: 7,
      ss: 2  
    },
    { 
      id: 47,
      style: 'card eight_diamonds',
      cs: 8,
      ss: 2 
    },
    { 
      id: 48,
      style: 'card nine_diamonds',
      cs: 9,
      ss: 2  
    },
    { 
      id: 49,
      style: 'card ten_diamonds',
      cs: 10,
      ss: 2 
    },
    { 
      id: 50,
      style: 'card jack_diamonds',
      cs: 11,
      ss: 2  
    },
    { 
      id: 51,
      style: 'card queen_diamonds',
      cs: 12,
      ss: 2  
    },
    { 
      id: 52,
      style: 'card king_diamonds',
      cs: 13,
      ss: 2   
    }
  ];

  $scope.sortedCards = [];

  $scope.selectGameCards = function($scope) {
    while($scope.sortedCards.length < 2)
    {

      var random = Math.floor(Math.random() * $scope.allCards.length + 1);

      for (var j = 0; j < $scope.sortedCards.length; j++) {
          if($scope.sortedCards[j].id == random) $scope.contains = true;
      };

      if(!$scope.contains) {
        $scope.sortedCards.push({ id: random, style: $scope.allCards[random-1].style, 
          cs: $scope.allCards[random-1].cs, ss: $scope.allCards[random-1].ss });  
      }

      $scope.contains = false;
    }
    return $scope.sortedCards;
  }

  $scope.sortedCards = $scope.selectGameCards($scope);
  fcards = $scope.sortedCards;

}



