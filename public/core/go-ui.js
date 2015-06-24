/**
 * Display the UI
 */

/**
 * [initUI description]
 */
Go.prototype.initUI = function () {

  var that = this;

  this.displayTimer();
  this.displayScore();
  this.searchPlayerGenerate();
  this.pause();

  $('.update-player').click(function () {

    that.socket.emit('display');
  });
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

/**
 * [searchPlayerGenerate description]
 * @return {[type]} [description]
 */
Go.prototype.searchPlayerGenerate = function () {

  $('.searchPlayer').on('keyup', function () {

    $.ajax({
        url: '/api/search',
        type: 'POST',
        data: {
          name: $(this).val()
        },
        success: function (data) {
          
          if (data) {
            $('.resultPlayer').html('<label><input type="radio" name="player2" value="'+ data.email +'">'+ data.email +'</label>');
          } else {
            $('.resultPlayer').html('<p>No result</p>');
          }
        }
      });
  });
};
