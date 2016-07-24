module.exports = function() {
  'use strict';

  this.extend(require('./config'));
  this.extend(require('./component'));

  require('./styles.scss');
};
