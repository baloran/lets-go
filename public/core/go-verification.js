/**
 * Permet de gerer les placements
 */

/**
 * [getCurrentObject description]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @return {[type]}   [description]
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

  console.log(el)

  if (!that.alreadyOccupy(el) && !that.jail(el)) {

    var $el = $(el);


    var gameElem = that.getCurrentObject($el.data('x'), $el.data('y'));

    $(gameElem.elem).append('<span class="' + that.getCurrentPlayerColor() + '"></span>')

    gameElem.user = that.getCurrentPlayer();

    gameElem.time = Date.now();

    that.getLiberty(gameElem);

    that.stopCountDown();

    that.gameUpdate(gameElem);

    that.switchPlayer();
  }
};

/**
 * [getLiberty description]
 * @param  {[type]} elem [description]
 * @return {[type]}      [description]
 */
Go.prototype.getLiberty = function (elem) {

  var that = this;
  var friend = 0;

  var currentUser = that.getCurrentPlayer();
  var secondUser = that.getSecondPlayer();

  if (elem.north != null && elem.north.user != null && elem.north.user.name == currentUser.name) {

    elem.north.liberty--;
    elem.liberty--;
    elem.prev = elem.north;
    elem.north.next = elem;
    that.addToChaine(elem, 'north');
    that.removeLiberty(elem.north);
    friend++;
  }

  if (elem.east != null && elem.east.user != null && elem.east.user.name == currentUser.name) {

    elem.east.liberty--;
    elem.liberty--;
    elem.prev = elem.east;
    elem.east.next = elem;
    that.addToChaine(elem, 'east');
    that.removeLiberty(elem.east);
    friend++;
  }

  if (elem.south != null && elem.south.user != null && elem.south.user.name == currentUser.name) {

    elem.south.liberty--;
    elem.liberty--;
    elem.prev = elem.south;
    elem.south.next = elem;
    that.addToChaine(elem, 'south');
    that.removeLiberty(elem.south);
    friend++;
  }

  if (elem.west != null && elem.west.user != null && elem.west.user.name == currentUser.name) {

    elem.west.liberty--;
    elem.liberty--;
    elem.prev = elem.west;
    elem.west.next = elem;
    that.addToChaine(elem, 'west');
    that.removeLiberty(elem.west);
    friend++;
  }

  if (elem.north != null && elem.north.user != null && elem.north.user.name == secondUser.name) {

    elem.north.liberty--;
    elem.liberty--;
    that.removeLiberty(elem.north);
  }

  if (elem.east != null && elem.east.user != null && elem.east.user.name == secondUser.name) {

    elem.east.liberty--;
    elem.liberty--;
    that.removeLiberty(elem.east);
  }

  if (elem.south != null && elem.south.user != null && elem.south.user.name == secondUser.name) {

    elem.south.liberty--;
    elem.liberty--;
    that.removeLiberty(elem.south);
  }

  if (elem.west != null && elem.west.user != null && elem.west.user.name == secondUser.name) {

    elem.west.liberty--;
    elem.liberty--;
    that.removeLiberty(elem.west);
  }

  if (friend == 0) {

    elem.prev = elem;
    
    var id = that.guid();

    elem.chaine = id;

    var chaine = new this.chaine();
    chaine.id = id;
    chaine.firstStone = elem;
    chaine.lastStone = elem;
    chaine.liberty = elem.liberty;
    
    that.chaines.push(chaine);
  }

  that.die(elem);
};

/**
 * [die description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Go.prototype.die = function (el) {

  var that = this;

  var c = _.where(that.chaines, {liberty:0});

  _.each(c, function (chaine) {

    var stones = _.where(that.game, {chaine: chaine.id});
    
    _.each(stones, function (stone) {

      $(stone.elem).find('span').fadeOut(function () {
        $(this).remove();
      });
    });
  });

  that.chaines = _.without(that.chaines, _.findWhere(that.chaines, {liberty: 0}));
};

/**
 * [removeLiberty description]
 * @param  {[type]} elem [description]
 * @return {[type]}      [description]
 */
Go.prototype.removeLiberty = function (elem) {

  var that = this;

  var c = _.where(that.chaines, {id: elem.chaine});

  c[0].liberty--;
}

/**
 * [addToChaine description]
 * @param {[type]} elem [description]
 */
Go.prototype.addToChaine = function (elem, friend) {

  var that = this;
  var cardinal = elem[friend];

  var c = _.where(that.chaines, {id: cardinal.chaine});

  if (c[0].firstStone.next.length < 1) {
    c[0].firstStone.next.elem;
  };

  elem.prev = c[0].lastStone;
  elem.chaine = c[0].id;
  c[0].lastStone.next = elem;
  c[0].lastStone = elem;
  c[0].liberty = c[0].liberty + elem.liberty;
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
