var socket = io();
var onlinePlayers = 0,
    dealer = 0,
    smallBlind = 0,
    bigBlind = 0,
    playersIndex = 1,
    numeroApostas = 0,
    turn = 1;

var players = [],
    sortedIndexes = [];

var maior = -1,
    nomeGanhador = '';


// Poker Hand Evaluator by Pat Wilson ©2012 (Chrome|IE8|IE9)
hands=["4 of a Kind", "Straight Flush", "Straight", "Flush", "High Card",
"1 Pair", "2 Pair", "Royal Flush", "3 of a Kind", "Full House", "-Invalid-" ];

handRanks = [8,9,5,6,1,2,3,10,4,7,0];


function calcIndex(cs,ss) {
  var v,i,o,s; for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,cs[i]*4)) {v += o*((v/o&15)+1);}
  if ((v%=15)!=5) {return v-1;} else {s = 1<<cs[0]|1<<cs[1]|1<<cs[2]|1<<cs[3]|1<<cs[4];}
  v -= ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
  return v - (ss[0] == (ss[0]|ss[1]|ss[2]|ss[3]|ss[4])) * ((s == 0x7c00) ? -5 : 1);
}



function getCombinations(k,n) {
  var result = [], comb = [];
  function next_comb(comb, k, n ,i) {
    if (comb.length === 0) {for (i = 0; i < k; ++i) {comb[i] = i;} return true;}
    i = k - 1; ++comb[i];
    while ((i > 0) && (comb[i] >= n - k + 1 + i)) { --i; ++comb[i];}
    if (comb[0] > n - k) {return false;}
    for (i = i + 1; i < k; ++i) {comb[i] = comb[i-1] + 1;}
    return true;
  }
  while (next_comb(comb, k, n)) { result.push(comb.slice());}
  return result;
}

function getPokerScore(cs) {
  var a = cs.slice(), d={}, i;
  for (i=0; i<5; i++) {d[a[i]] = (d[a[i]] >= 1) ? d[a[i]] + 1 : 1;}
    a.sort(function(a,b){return (d[a] < d[b]) ? +1 : (d[a] > d[b]) ? -1 : (b - a);});
  return a[0]<<16|a[1]<<12|a[2]<<8|a[3]<<4|a[4];
}    

function rankHand(cards, suits) {
  var index = 10, winCardIndexes, i;

  var cards = cards,
      suits = suits;

  if (cards !== null && suits !== null) {
    if (cards.length == suits.length) {

      if (cards.length >= 5) {
        if (cards.length == suits.length) {
          for (i=0;i<cards.length;i++) { cards[i]-=0; }

          var c = getCombinations(5, cards.length);
          var maxRank = 0, winIndex = 10;
          for (i=0; i < c.length; i++) {
            var cs = [cards[c[i][0]], cards[c[i][1]], cards[c[i][2]], 
            cards[c[i][3]], cards[c[i][4]]];
            var ss = [suits[c[i][0]], suits[c[i][1]], suits[c[i][2]], 
            suits[c[i][3]], suits[c[i][4]]];
            index = calcIndex(cs,ss);

            if (handRanks[index] > maxRank) {
              maxRank = handRanks[index];
              winIndex = index; 
              wci = c[i].slice();
            } else if (handRanks[index] == maxRank) {
              var score1 = getPokerScore(cs);
              var score2 = getPokerScore([cards[wci[0]],cards[wci[1]],cards[wci[2]],
              cards[wci[3]],cards[wci[4]]]);
              if (score1 > score2) { wci= c[i].slice(); }
            }
          } 
        index = winIndex; 
      }                     
    }     
  }
}
    return handRanks[index];
}  

/* end of hand evalation */


function calculateWinner() {
  var cards = [lcards[0].cs, lcards[1].cs, lcards[2].cs, lcards[3].cs, lcards[4].cs];
  var suits = [lcards[0].ss, lcards[1].ss, lcards[2].ss, lcards[3].ss, lcards[4].ss];

  for(var i = 0; i < players.length; i++) {
    players[i].data.allcs = cards.concat(players[i].data.deck.one.cs)
    .concat(players[i].data.deck.two.cs);
    players[i].data.allss = suits.concat(players[i].data.deck.one.ss)
    .concat(players[i].data.deck.two.ss);
  }

  for(var i = 0; i < players.length; i++) {
    atual = rankHand(players[i].data.allcs, players[i].data.allss);
    if(atual > maior) {
      maior = atual;
      nome = players[i].data.nickname;
    }
  }

  var msg = 'Fim de Jogo!!\nGanhador: '+nome+'\nMão: '
  + hands[handRanks.indexOf(maior)];

  alert(msg);
  //socket.emit('river', msg);
}


function showCards(msg, selector) {
  alert('Início do '+msg+'!!');
  $('.card:'+selector).fadeIn(3000);
}

function swapTurn() {
  if(turn == 1) showCards('flop', 'lt(3)'); 
  else if(turn == 2) showCards('turn', 'eq(3)'); 
  else if(turn == 3) showCards('river', 'eq(4)'); 
  else 
    calculateWinner();
}

function updateClientsBet(newValue) {
  socket.emit('update-client', newValue);
}

function updateTableBlinds(newValue) {
  updateClientsBet(newValue);
  var valueDom = document.getElementById('value');
  value = parseInt(valueDom.innerHTML) + parseInt(newValue);
  valueDom.innerHTML = value;
  numeroApostas++;
  if(numeroApostas == onlinePlayers) {
    numeroApostas = 0;
    swapTurn();
    turn++;
  }
}



$(document).ready(function () {   
  var deck = $('.card').hide();
  var playOrPause = $('#poker_play_pause').hide();
  var nextRound = $('#poker_next_round');
  var reset = $('.reset');
  var board = $('.board');
  var value = $('#value').val();
  var valueHTML = $('#value');

  sortedIndexes = sorted;

  socket.on('user-logged', function(userData){
//players.push({id: playersIndex++, data: userData});
players.push({id: userData.id, data: userData}.data);

});

  socket.on('message', function(visitors) {
    onlinePlayers = visitors - 1;
    document.getElementById('players').innerHTML = onlinePlayers;

    if(onlinePlayers >= 2) {
      $('#poker_play_pause').show(),
      $('#cantstart').hide();
    }
  });

  socket.on('card-broadcast', function(cardData){
    board.append(cardData.cardList[0]).append(cardData.cardList[1]);
    alert(cardData.nickname+ ' desistiu!');
  });

  socket.on('raise-update', function(newValue){
    updateTableBlinds(newValue);
  });

  socket.on('blinds-update', function(currentValue) {
    updateTableBlinds(currentValue);  
  });

  socket.on('call', function() {
    numeroApostas++;
  });


  playOrPause.click(function () {
    if (Poker.isGamePaused()) {

      Poker.startClock();

      dealer = Math.floor(Math.random() * (onlinePlayers - 1)) + 1;
      smallBlind = (dealer + 1) % players.length;
      bigBlind = (dealer + 2) % players.length;

      socket.emit('pre-flop', {sorted: sortedIndexes, player: players[dealer].id});

      socket.emit('sblind', {id: (players[dealer.id + 1]) % players.length,
        data: players[smallBlind].id});

      socket.emit('bblind', {id: (players[dealer.id + 2]) % players.length,
        data: players[bigBlind].id});
    } 
    else { Poker.stopClock(); }

    Poker.updatePlayPauseButton();
  });

  nextRound.click(function () {
    Poker.startNextRound();
  });

  reset.click(function () {
    Poker.reset();
  });
});

