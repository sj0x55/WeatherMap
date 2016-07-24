module.exports = function(source, map) {
  var
    path = require('path'),
    settings = require('../../settings'),
    modulePath = path.relative(settings.basePath, this.resource).replace(/\\+/g, '/'),
    replace = function(str, modulePath) {
      return str
        .replace(/@@MODULE_PATH/g, '/' + modulePath);
    };

  this.cacheable && this.cacheable();

  return replace(source, modulePath);
};
