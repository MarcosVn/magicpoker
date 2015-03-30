var sense = sense.init();
    var socket = io();
    var colors = [
      "#33B5E5",
      "#AA66CC",
      "#99CC00",
      "#FFBB33",
      "#FF4444"
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
    }
    socket.on('color-broadcast', function(color){
      selectedColor = color;
      $('body').css({"background": selectedColor});
    })