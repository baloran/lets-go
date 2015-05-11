/*
    Start the game
 */

requirejs.config({
  urlArgs: "noCache=" + (new Date).getTime(),
  paths: {
    go: "go",
    lib: "lib"
  }
});

require(['go'], function (go) {

  require(['lib'], function (lib) {

    var app = new Go();
    app.init();
  });

});
