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


    var gameElem = that.getCurrentObject($el.data('x'), $el.data('y'));

    $(gameElem.elem).append('<span class="' + that.getCurrentPlayerColor() + '"></span>')

    gameElem.user = that.getCurrentPlayer();

    that.getLiberty(gameElem);

    that.stopCountDown();

    that.switchPlayer();
  }
};

Go.prototype.getLiberty = function (elem) {

  var that = this;
  var friend = 0;

  console.log(elem);

  var currentUser = that.getCurrentPlayer();
  var secondUser = that.getSecondPlayer();

  if (elem.north != null && elem.north.user != null && elem.north.user.name == currentUser.name) {

    console.log("pote au nord");
    elem.north.liberty--;
    elem.liberty--;
    elem.prev = elem.north;
    elem.north.next = elem;
    friend++;
  }

  if (elem.east != null && elem.east.user != null && elem.east.user.name == currentUser.name) {

    console.log("pote à east");
    elem.east.liberty--;
    elem.liberty--;
    elem.prev = elem.east;
    elem.east.next = elem;
    friend++;
  }

  if (elem.south != null && elem.south.user != null && elem.south.user.name == currentUser.name) {

    console.log("pote à south");
    elem.south.liberty--;
    elem.liberty--;
    elem.prev = elem.south;
    elem.south.next = elem;
    friend++;
  }

  if (elem.west != null && elem.west.user != null && elem.west.user.name == currentUser.name) {

    console.log("pote à west");
    elem.west.liberty--;
    elem.liberty--;
    elem.prev = elem.west;
    elem.west.next = elem;
    friend++;
  }

  if (elem.north != null && elem.north.user != null && elem.north.user.name == secondUser.name) {

    console.log("ennemie au nord");
    elem.north.liberty--;
    elem.liberty--;
  }

  if (elem.east != null && elem.east.user != null && elem.east.user.name == secondUser.name) {

    console.log("ennemie à east");
    elem.east.liberty--;
    elem.liberty--;
  }

  if (elem.south != null && elem.south.user != null && elem.south.user.name == secondUser.name) {

    console.log("ennemie à south");
    elem.south.liberty--;
    elem.liberty--;
  }

  if (elem.west != null && elem.west.user != null && elem.west.user.name == secondUser.name) {

    console.log("ennemie à west");
    elem.west.liberty--;
    elem.liberty--;
  }

  if (friend == 0) {

    elem.prev = elem;
    that.chaine.push(elem);
  }

  console.log(that.chaine);

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

    if (dir.is('span.white')) {

      console.log('white');
    }

  });

  return false;
};
