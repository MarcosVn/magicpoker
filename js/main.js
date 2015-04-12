function betsController ($scope) {
  $scope.bets = [ {
      color: 'blue',
      val: 10,
    }
  ];

  
  $scope.all = function () {
    var all = 0;

    for (var i = 0; i < $scope.bets.length; i++) {
        all += $scope.bets[i].val;
    };

    return all;
  };
}


$(document).ready(function () {
  $('.card').hide();
  $('.bet').hide();
  $('span').hide();

  $('#start').click(function () {
      $('.card').draggable();
      $('.bet').draggable();
      $('body').addClass('background');
      $('.bet').show("slow");
      $('span').show("slow");
      $('.card').show("slow");
  });

  $('#end').click(function(){
    $('.card').hide();
    $('.bet').hide();
    $('body').removeClass('background');
  });
});









var sense = sense.init();
    var socket = io();
    var colors = [
      "#33B5E5",
      "#AA66CC",
      "#99CC00",
      "#FFBB33",
      "#FF4444"
    ];

    var cards = [


    ];




    var selectedColor = colors[0];
    sense.flick(function(data){
      broadcast();
    });
    $(document).ready(function(){
      $('.option').each(function(i, element){
        $(element)
            .css({"background": colors[i]})
            .click(function(){
              $('body').css({"background": colors[i]});
              selectedColor = colors[i]
            })
      })
    });
    function broadcast(){
      socket.emit('color', selectedColor)
      //socket.emit('card', selectedCard)
    }
    socket.on('color-broadcast', function(color){
      selectedColor = color;
      $('body').css({"background": selectedColor});
    })