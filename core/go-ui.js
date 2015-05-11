/**
 * Display the UI
 */

/**
 * [initUI description]
 */
Go.prototype.initUI = function () {

  this.displayTimer();
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
