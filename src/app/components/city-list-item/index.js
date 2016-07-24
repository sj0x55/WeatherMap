module.exports = function() {
  'use strict';

  this.extend(require('./service'));
  this.extend(require('./component'));

  require('./styles.scss');
};
