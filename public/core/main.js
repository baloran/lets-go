define([
    'jquery',
    'underscore',
    'circular-json',
    'underscore_observable',
    'go',
    'lib',
    'player',
    'verification',
    'ui'
  ], function ($, _, io) {

  $(function(_) {

    var app = new Go(io);
    app.init();

  });

});
