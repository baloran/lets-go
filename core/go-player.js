/**
 *	Let's Go
 *	2015
 */

/**
 * [switchPlayer description]
 */
Go.prototype.switchPlayer = function () {

  this.countPoint();

  this.startCountDown();

  this.currentPlayer = (this.currentPlayer == 0) ? 1 : 0;
};

/**
 * [getCurrentPlayer description]
 */
Go.prototype.getCurrentPlayerColor = function () {

  return (this.currentPlayer == 0) ? 'black' : 'white';
};

/**
 * [getCurrentPlayer description]
 */
Go.prototype.getCurrentPlayer = function () {

  for (var i = 0; i < this.players.length; i++) {

    var player = this.players[i];

    if (this.players[i].id == this.currentPlayer) {
      return this.players[i];
    }
  }

};

/**
 * [getSecondPlayer description]
 * @return {[type]} [description]
 */
Go.prototype.getSecondPlayer = function () {

  for (var i = 0; i < this.players.length; i++) {

    var player = this.players[i];

    if (this.players[i].id != this.currentPlayer) {
      return this.players[i];
    }
  }

};

/**
 * [startCountDown description]
 */
Go.prototype.startCountDown = function () {

  var that = this;

  that.countDown = setInterval( function() {

    var player = that.getCurrentPlayer();

    // Incremente Player time
    player.time++;

  }, 1000);
};

/**
 * [stopCountDown description]
 */
Go.prototype.stopCountDown = function () {

  clearInterval(this.countDown);
};

/**
 * [pauseCountDown description]
 */
Go.prototype.pauseCountDown = function () {

  if (this.gameOptions.pause) { // Si jeu en pause

    this.gameOptions.pause = false;
    this.startCountDown();
  } else { // Sinon

    this.gameOptions.pause = true;
    this.stopCountDown();
  }
};

/**
 * [countPoint description]
 */
Go.prototype.countPoint = function () {

  var that = this;
  var $cases = $('.case').find('span');
  var white = 0;
  var black = 0;

  $cases.each( function (item) {

    if ($(this).hasClass('white')) {
      white++;
    } else {
      black++;
    }
  });

  for (var i = 0; i < that.players.length; i++) {

    if (that.players[i].id == 0) {
      that.players[i].score = white;
    } else {
      that.players[i].score = black;
    }
  }

};
