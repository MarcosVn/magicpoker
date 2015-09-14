function tableController ($scope) {
  $scope.allCards = [
    { 
      id: 1,
      style: 'ace_clubs'  
    },
    { 
      id: 2,
      style: 'two_clubs'   
    },
    { 
      id: 3,
      style: 'three_clubs'   
    },
    { 
      id: 4,
      style: 'four_clubs' 
    }, 
    { 
      id: 5,
      style: 'five_clubs'
    },
    { 
      id: 6,
      style: 'six_clubs'
    },
    { 
      id: 7,
      style: 'seven_clubs'
    },
    { 
      id: 8,
      style: 'eight_clubs'
    },
    { 
      id: 9,
      style: 'nine_clubs'
    },
    { 
      id: 10,
      style: 'ten_clubs'
    },
    { 
      id: 11,
      style: 'jack_clubs'
    },
    { 
      id: 12,
      style: 'queen_clubs'
    },
    { 
      id: 13,
      style: 'king_clubs'
    },
    { 
      id: 14,
      style: 'ace_hearts'   
    },
    { 
      id: 15,
      style: 'two_hearts'
    },
    { 
      id: 16,
      style: 'three_hearts'  
    },
    { 
      id: 17,
      style: 'four_hearts'  
    },
    { 
      id: 18,
      style:  'five_hearts' 
    },
    { 
      id: 19,
      style:   'six_hearts' 
    },
    { 
      id: 20,
      style:  'seven_hearts' 
    },
    { 
      id: 21,
      style:   'eight_hearts' 
    },
    { 
      id: 22,
      style:   'nine_hearts' 
    },
    { 
      id: 23,
      style:   'ten_hearts' 
    },
    { 
      id: 24,
      style: 'jack_hearts'    
    },
    { 
      id: 25,
      style:  'queen_hearts'   
    },
    { 
      id: 26,
      style:  'king_hearts'  
    },
    { 
      id: 27,
      style:  'ace_spades'  
    },

    { 
      id: 28,
      style:  'two_spades'   
    },
    { 
      id: 29,
      style: 'three_spades'   
    },
    { 
      id: 30,
      style:  'four_spades'   
    },
    { 
      id: 31,
      style:  'five_spades'   
    },
    { 
      id: 32,
      style:  'six_spades'   
    },
    { 
      id: 33,
      style:  'seven_spades'   
    },
    { 
      id: 34,
      style:   'eight_spades'  
    },
    { 
      id: 35,
      style:  'nine_spades'   
    },
    { 
      id: 36,
      style:   'ten_spades'  
    },
    { 
      id: 37,
      style:  'jack_spades'   
    },
    { 
      id: 38,
      style:  'queen_spades'   
    },
    { 
      id: 39,
      style:  'king_spades'   
    },
    { 
      id: 40,
      style: 'ace_diamonds'    
    },
    { 
      id: 41,
      style: 'two_diamonds' 
    },
    { 
      id: 42,
      style: 'three_diamonds' 
    },
    { 
      id: 43,
      style:  'four_diamonds'  
    },
    { 
      id: 44,
      style:   'five_diamonds' 
    },
    { 
      id: 45,
      style:  'six_diamonds' 
    },
    { 
      id: 46,
      style:  'seven_diamonds'  
    },
    { 
      id: 47,
      style:   'eight_diamonds' 
    },
    { 
      id: 48,
      style:  'nine_diamonds'  
    },
    { 
      id: 49,
      style:   'ten_diamonds' 
    },
    { 
      id: 50,
      style:  'jack_diamonds'  
    },
    { 
      id: 51,
      style:  'queen_diamonds'  
    },
    { 
      id: 52,
      style: 'king_diamonds'   
    }
  ];


  $scope.sortedCards = [];


  $scope.selectGameCards = function($scope) {
    for (var i = 1; i < 6; i++) {
      var random = Math.floor(Math.random() * ($scope.allCards.length));
      console.log(random);
      $scope.sortedCards.push({ id: random, style: $scope.allCards[random].style });
    };
    return $scope.sortedCards;
  }

  $scope.sortedCards = $scope.selectGameCards($scope);

  console.log($scope.sortedCards);
}



