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
var Go = function () {

  this.gameElement = document.querySelector("#game");

  this.gameOptions = {
    finish: false,
    pause: false,
    size: '19'
  }

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
    }
  ];

  this.players = [
    {
      id: 0,
      name: 'John',
      score: 0,
      time: 0
    },
    {
      id: 1,
      name: 'Jean',
      score: 0,
      time: 0
    }
  ];

  this.game = [];
  this.chaine = [];

  this.stone = function () {
    this.next =  null;
    this.prev =  null;
    this.x =  0;
    this.y =  0;
    this.east =  0;
    this.north =  0;
    this.west =  0;
    this.south =  0;
    this.liberty =  0;
    this.elem = null;
    this.user = null;
  };

  this.currentPlayer = 0;
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
    }

    that.events();

  });

  this.generateGameBoard();
  this.initUI();

};

Go.prototype.getCurrentSize = function () {

  var that = this;

  var size = _.findWhere(that.sizeGame, {slug: that.gameOptions.size});

  console.log(size);

  return size;
}

/**
 * generateGameBoard
 * Permet de genererer le tableau de jeu
 */
Go.prototype.generateGameBoard = function () {

  var that = this;
  var j = 1;
  var l = 1;
  var size = that.getCurrentSize();

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

  for (var i = 0; i < that.game.length; i++) {

    
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

    elem.addEventListener('click', function (){

      that.placement(this);

    });
  }

  // Click on button Pause
  $('button.togglePause').click(function () {

    console.log("test");
    that.pauseCountDown();

  });

};
