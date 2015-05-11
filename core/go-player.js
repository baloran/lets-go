/**
 *	Let's Go
 *	2015
 */

/**
 * [switchPlayer description]
 */
Go.prototype.switchPlayer = function () {

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
