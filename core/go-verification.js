/**
 * Permet de gerer les placements
 */

Go.prototype.getCurrentObject = function (x, y) {

  var that = this;

  var elem = _.findWhere(that.game, {x: x, y:y});

  return elem;
};

/**
 * [placement description]
 * @return {[type]} [description]
 */
Go.prototype.placement = function (el) {

  var that = this;

  if (!that.alreadyOccupy(el) && !that.jail(el)) {

    var $el = $(el);

    $el.append('<span class="' + that.getCurrentPlayerColor() + '"></span>');

    var gameElem = that.getCurrentObject($el.data('x'), $el.data('y'));

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
    'north'    : $('.case[data-x="' + ($el.data('x')) + '"][data-y="' + ($el.data('y') - 1) + '"]'),
    'north-east'    : $('.case[data-x="' + ($el.data('x') - 1) + '"][data-y="' + ($el.data('y') + 1) + '"]'),
    'east' : $('.case[data-x="' + ($el.data('x') + 1) + '"][data-y="' + ($el.data('y')) + '"]'),
    'south-east' : $('.case[data-x="' + ($el.data('x') + 1) + '"][data-y="' + ($el.data('y') + 1) + '"]'),
    'south'  : $('.case[data-x="' + ($el.data('x')) + '"][data-y="' + ($el.data('y') + 1) + '"]'),
    'south-west'  : $('.case[data-x="' + ($el.data('x') - 1) + '"][data-y="' + ($el.data('y') + 1) + '"]'),
    'west'  : $('.case[data-x="' + ($el.data('x') - 1) + '"][data-y="' + ($el.data('y')) + '"]'),
    'north-west'  : $('.case[data-x="' + ($el.data('x') + 1) + '"][data-y="' + ($el.data('y') - 1) + '"]'),
  };

  

  _.each(direction, function (dir) {

    console.log(dir);

    if (dir.is('span.white')) {

      console.log('white');
    }

  });

  return false;
};
