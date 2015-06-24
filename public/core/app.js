/*
    Start the game
 */

requirejs.config({
  urlArgs: "noCache=" + (new Date).getTime(),
  paths: {
    'go'                      : "go",
    'lib'                     : "lib",
    'circular-json'           : "vendors/circular-json",
    'player'                  : "go-player",
    'verification'            : "go-verification",
    'ui'                      : "go-ui",
    'jquery'                  : "vendors/jquery",
    'underscore'              : "vendors/underscore",
    'underscore_observable'   : "vendors/underscore.observable"
  },
  shim: {
    underscore: {
      exports: function() {
        return _.noConflict();
      }
    },
    underscore_observable: {
      deps: ['underscore']
    },
    lib: {
      deps: ['go','circular-json']
    },
    player: {
      deps: ['go','circular-json']
    },
    ui: {
      deps: ['go','circular-json']
    },
    verification: {
      deps: ['go','circular-json']
    },
  }
});

requirejs(['main']);
