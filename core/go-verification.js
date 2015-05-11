/**
 * Permet de gerer les placements
 */

/**
 * [placement description]
 * @return {[type]} [description]
 */
Go.prototype.placement = function (el) {

  var that = this;

  if (!that.alreadyOccupy(el) && !that.jail(el)) {

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

/**
 * [jail description]
 * @return {[type]} [description]
 */
Go.prototype.jail = function (el) {

  var $el = $(el);

  var direction = {
    'up'    : $('.case[data-x="' + ($el.data('x')) + '"][data-y="' + ($el.data('y') - 1) + '"]').find('span'),
    'left'  : $('.case[data-x="' + ($el.data('x') - 1) + '"][data-y="' + ($el.data('y')) + '"]').find('span'),
    'right' : $('.case[data-x="' + ($el.data('x') + 1) + '"][data-y="' + ($el.data('y')) + '"]').find('span'),
    'down'  : $('.case[data-x="' + ($el.data('x')) + '"][data-y="' + ($el.data('y') + 1) + '"]').find('span')
  };

  _.each(direction, function (dir) {

    if (dir.is('.white, .black')) {
      console.log(dir);
      
    }

  });

  return false;
};
