/**
 * Display the UI
 */

/**
 * [initUI description]
 */
Go.prototype.initUI = function () {

  this.displayTimer();
  this.displayScore();
  this.pause();
};

/**
 * [displayTimer description]
 */
Go.prototype.displayTimer = function () {

  var that = this;

  var player = that.getCurrentPlayer();

  _.observe(that.players, function () {

    var player = that.getCurrentPlayer();

    for(var i = 0; i < that.players.length; i++) {

      var p = that.players[i];

      if (p.id == 0) {

        $('#timePlayer1').html(p.time);
      } else {

        $('#timePlayer2').html(p.time);
      }

    }

  });

};

/**
 * [displayScore description]
 */
Go.prototype.displayScore = function () {

  this.players.forEach(function (item) {

    watch(item, 'score', function () {

      if (item.id == 0) {

        $('#scorePlayer1').html(item.score);
      } else {
        
        $('#scorePlayer2').html(item.score);
      }
    });

  });
};

Go.prototype.pause = function () {

  var that = this;

  watch(that.gameOptions, 'pause', function () {

    if (that.gameOptions.pause) {

      $('#game').fadeOut();

    } else {

      $('#game').fadeIn();
    }
  });
};
