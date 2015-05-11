/**
 * Permet de gerer les placements
 */

/**
 * [placement description]
 * @return {[type]} [description]
 */
Go.prototype.placement = function (el) {

  var that = this;

  if (!that.alreadyOccupy(el)) {

    $(el).append('<span class="' + that.getCurrentPlayerColor() + '"></span>');

    that.stopCountDown();

    that.switchPlayer();
  }
};

/**
 * [alreadyOccupy description]
 * @param {[type]} el [description]
 */
Go.prototype.alreadyOccupy = function (el) {

  if (el.querySelector('span')) {
    return true;
  } else {
    return false;
  }
};
