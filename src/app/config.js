/*eslint no-console: ["off"] */

module.exports = function () {
  'use strict';

  /**
   * Added ability to log the errors to the server
   */
  this.config(function ($provide, ERROR_TYPES) {
    $provide.decorator('$log', function ($delegate) {
      $delegate.error = logToServerClosure(ERROR_TYPES.ERROR);
      $delegate.info = logToServerClosure(ERROR_TYPES.INFO);
      $delegate.warn = logToServerClosure(ERROR_TYPES.WARN);

      return $delegate;
    });

    $provide.decorator('$exceptionHandler', function () {
      return logToServerClosure(ERROR_TYPES.ERROR);
    });
  });

  /** API */
  /**
   * Keep specific type of errors in closure
   *
   * @param {String} type
   * @return {Function}
   */
  function logToServerClosure(type) {
    var consoleByType = console[type] || console.error;

    /**
     * Keep specific type of errors in closure
     *
     * @param {Error|Array|String} error
     * @param {String|Undefined} location
     * @return {void}
     */
    return function logToServer(error, location) {
      try {
        var args = normalizeLogArguments(error, location);

        error = args.error;
        location = args.location;

        if (process.env.NODE_ENV === 'production') {
          // Sending error to the server...
        } else {
          consoleByType.call(console, error && error.message, location);
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'production') {
          console.info('Something happened wrong, please let us know: {phone number}');
        } else {
          console.error(err);
        }
      }
    };
  }

  /**
   * Normalize all arguments from different format for log() function
   *
   * @param {Object|String} error
   * @param {String} location
   * @param {String} type
   * @return {Object}
   */
  function normalizeLogArguments(error, location) {
    if (angular.isArray(error)) {
      location = error[1] || location;
      error = (error[0] instanceof Error) ? error[0] : Error(error[0]);
    } else if (angular.isString(error)) {
      error = Error(error);
    } else if (!(error instanceof Error)) {
      error = Error('Unknown error message');
    }

    return {
      error: error,
      location: location
    };
  }
};
