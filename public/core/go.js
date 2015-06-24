/*
    Lets Go
    04/05/2015

    Team:
      - Miléna Tarrière
      - Morgane Le Saout
      - Nicolas Aguado
      - Arnaud Allouis
 */

/**
 * [Go description]
 */
var Go = function (io) {

  this.gameElement = document.querySelector("#game");
  
  this.gameOptions = {
    finish: false,
    pause: false,
    size: '19'
  };

  this.sizeGame = [
    {
      x: 19,
      y: 19,
      name: '19X19',
      slug: '19'
    },
    {
      x: 12,
      y: 12,
      name: '12X12',
      slug: '12'
    },
    {
      x: 9,
      y: 9,
      name: '9X9',
      slug: '9'
    }
  ];

  this.players = [
    {
      id: 0,
      name: 'John',
      score: 0,
      time: 0,
      type: 'host'
    },
    {
      id: 1,
      name: 'Jean',
      score: 0,
      time: 0,
      type: 'player'
    }
  ];

  this.game = [];
  this.chaines = [];
  this.stones = [];

  this.chaine = function () {
    
    this.id = null;
    this.firstStone = null;
    this.lastStone = null;
    this.liberty = null;
    this.jail = false;
    this.time = null;
  };

  this.stone = function () {
    
    this.x =  0;
    this.y =  0;
    this.next = null;
    this.prev = null;
    this.east =  null;
    this.north =  null;
    this.west =  null;
    this.south =  null;
    this.liberty =  0;
    this.elem = null;
    this.user = null;
    this.timePose = null;
    this.chaine = null;
    this.time = null;
  };

  this.currentPlayer = 0;
};

/**
 * Load game by id
 * @param  {[type]} gameID [description]
 * @return 1        loaded extern
 * @return 2        neeed to be generate
 */
Go.prototype.loadGame = function (cb) {

  var that = this;

  $.ajax({
      url: '/getParty/' + $('body').data('id'),
      type: 'GET',
      success: function (data) {

        that.gameOptions.size = data.size;

        var player1 = _.where(that.players, {type:'host'});
        var player2 = _.where(that.players, {type:'player'});

        player1[0].name = data.host;
        player2[0].name = data.player;

        if (data.stones.length > 0) {

          that.stones = data.stones;
          cb(false, 1);
        } else {
          cb(false, 2);
        }
      }
    });
};

Go.prototype.gameUpdate = function (elem) {

  var that = this;

  var obj = {
    x:elem.x,
    y:elem.y,
    email: that.getCurrentPlayerEmail(),
    nextPlayer: that.getSecondPlayer().name,
    id: that.stones.length + 1
  }

  that.stones.push(obj);

  $.ajax({
      url: '/updateParty/' + $('body').data('id'),
      type: 'post',
      data: obj,
      success: function (data) {
        console.log(data);
      }
    });
};

/**
 * init
 * Instancie le jeu
 */
Go.prototype.init = function () {

  var that = this;

  watch(that.gameOptions, "finish", function(){

    if (that.gameOptions.finish) {
      that.elemCases = document.querySelectorAll('.case');
      that.generateLinkObject();

      if (that.stones.length > 0) {
        var stones = _.indexBy(that.stones, 'id');

        _.each(stones, function (stone) {

            console.log($('.case[data-x="'+stone.x+'"][data-y="'+stone.y+'"]'))

          that.placement(document.querySelector('.case[data-x="'+stone.x+'"][data-y="'+stone.y+'"]'))
        });
      };
    }

    that.events();

  });

  if ($('body').data('game')) {

    that.loadGame(function (err, load) {

      if (err) return console.log(err);

      if (load == 2) {

        that.generateGameBoard();
      } else if (load == 1) {
        that.generateGameBoard();

      }
    });
  };
  
  that.initUI();
};

Go.prototype.getCurrentSize = function () {

  var that = this;

  var size = _.findWhere(that.sizeGame, {slug: that.gameOptions.size});

  return size;
}

/**
 * generateGameBoard
 * Permet de genererer le tableau de jeu
 */
Go.prototype.generateGameBoard = function (cb) {

  var that = this;
  var j = 1;
  var l = 1;
  var size = that.getCurrentSize();

  $(that.gameElement).addClass('size'+that.gameOptions.size); 

  for (var i = 1; i < (size.x + 1); i++) {

    var elem = document.createElement("div");
    elem.dataset.x = i;
    elem.dataset.y = j;

    var s = new that.stone();
    s.x = i;
    s.y = j;
    s.elem = elem;

    that.game.push(s);

    that.gameElement.appendChild(elem);

    that.addClass(elem, "case");

    if (l == size.x) {
      that.gameOptions.finish = true;
      cb(true);
      break;
    }

    if (j == size.y) {
      l++;
    }

    if (i == size.x) {
      i = 0;
      j++;
    }

  }

};

/**
 * [generateLinkObject description]
 * @return {[type]} [description]
 */
Go.prototype.generateLinkObject = function () {

  var that = this;
  var size = that.getCurrentSize();

  for (var i = 0; i < that.game.length; i++) {

    var liberty = 0;
    var elem = that.game[i];

    // North
    if (elem.y - 1 != 0) {

      var north = _.findWhere(that.game, {x: elem.x, y: elem.y -1});

      elem.north = north;
      liberty++;
    }

    // West
    if (elem.x - 1 != 0) {

      var west = _.findWhere(that.game, {x: elem.x - 1, y: elem.y});

      elem.west = west;
      liberty++;
    }

    // South
    if (elem.y + 1 < size.x) {

      var south = _.findWhere(that.game, {x: elem.x, y: elem.y + 1});

      elem.south = south;
      liberty++;
    }

    // East
    if (elem.x + 1 < size.x) {

      var east = _.findWhere(that.game, {x: elem.x + 1, y: elem.y});

      elem.east = east;
      liberty++;
    }

    elem.liberty = liberty;
  }
};

/**
 * [events description]
 * @return {[type]} [description]
 */
Go.prototype.events = function () {

  var that = this;

  // Click on cases
  for (var i = 0; i < that.elemCases.length; i++) {

    var elem = that.elemCases[i];

    $(elem).on('click', function (){

      that.placement(this);

    });
  }

  // Click on button Pause
  $('button.togglePause').click(function () {

    console.log("test");
    that.pauseCountDown();

  });

};
