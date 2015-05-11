/*
    Lets Go
    04/05/2015

    Team:
      - Miléna Tarrière
      - Morgane Le Saout
      - Nicolas Aguado
      - Arnaud Allouis
 */

var Go = function () {

  this.gameElement = document.querySelector("#game");

  this.gameOptions = {
    finish: false
  }

  /**
   * init
   * Instancie le jeu
   */
  this.init = function () {

    var that = this;

    watch(that.gameOptions, "finish", function(){

      if (that.gameOptions.finish) {
        that.elemCases = document.querySelectorAll('.case');
      }

      that.events();

    });

    this.generateGameBoard();

  };

  /**
   * generateGameBoard
   * Permet de genererer le tableau de jeu
   */
  this.generateGameBoard = function () {

    var that = this;
    var j = 1;
    var l = 1;

    for (var i = 1; i < 20; i++) {

      var elem = document.createElement("div");
      elem.dataset.x = i;
      elem.dataset.y = j;

      that.gameElement.appendChild(elem);

      that.addClass(elem, "case");

      if (l == 19) {
        that.gameOptions.finish = true;
        break;
      }

      if (j == 19) {
        l++;
      }

      if (i == 19) {
        i = 0;
        j++;
      }

    }
  };

  this.events = function () {

    var that = this;

    that.elemCases.forEach(function (item) {
      console.log(item);
    });
    // that.elemCases.addEventListener('onclick', function (){
    //   console.log("salut");
    // });
  };

};
