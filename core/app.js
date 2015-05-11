/*
    Start the game
 */

requirejs.config({
  urlArgs: "noCache=" + (new Date).getTime(),
  paths: {
    'go'                      : "go",
    'lib'                     : "lib",
    'player'                  : "go-player",
    'verification'            : "go-verification",
    'ui'                      : "go-ui",
    'jquery'                  : "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
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
    }
  }
});

requirejs(['main']);
