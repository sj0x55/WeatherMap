'use strict';

module.exports = (function() {
  var path = require('path');
  var settings = require('../../settings');

  return {
    app: {
      configFile: path.resolve(settings.basePath, 'karma.config.js')
    }
  };
})();
