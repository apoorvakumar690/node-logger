/** Requires */
const ip = require('ip');
const stackTrace = require('stack-trace');
const Log = require('../log/log.js');
/**
 * The possible levels of logs are mentioned below in the order of decreasing severity
 */
const Type = {
  Fatal: 'fatal',
  Warning: 'warning',
  Errsev1: 'errsev1',
  Errsev2: 'errsev2',
  Errsev3: 'errsev3',
  Info: 'info',
  Debug: 'debug',
};
/**
 * This indicates the component of the application, where the error has occurred
 */
const Component = {
  Datastore: 'Datastore',
  Queue: 'Queue',
  InternalServices: 'InternalServices',
  ExternalServices: 'ExternalServices',
  Application: 'Application',
};
/**
 * Exception Log Categories
 */
const Category = {
  ConnectionError: 'ConnectionError',
  TimeoutError: 'TimeoutError',
  DataNotFoundError: 'DataNotFoundError',
  ParseError: 'ParseError',
  ValidationError: 'ValidationError',
  UnknownError: 'UnknownError',
  conflict: 'conclictError'
};

const HttpStatus = {
  "ERROR": 500,
  "REDIRECT": 307,
  "NOT-FOUND": 404,
  "CONFLICT": 409,
  "UNAUTHORIZED": 401,
  "BAD-REQUEST": 400,
  "METHOD-NOT-ALLOWED": 405,
  "TOO-MANY-REQUEST": 429,
  "UNAVAILABLE-FOR-LEGAL-REASON": 451,
  "OK": 200,
  "CREATED": 201,
  "ACCEPTED": 202,
  "NETWORK-AUTHENTITCATION-REQUIRED": 511
}

/** Class Definition */
class Logger {
  /**
   * Initializes the instance variables.
   *
	 * @param {object} params
	 * @param {string} params.app - Application name
	 * @param {number} params.level - Stacktrace level, default level
   * */
  constructor(params) {
    // Validates Input
    /* eslint no-console:0 */
    if (!params.app) {
      throw new Error('application name not provided');
    }
    params.level = !params.level ? 1 : params.level;

    if (params.level < 1 || params.level > 5) {
      params.level = 1;
    }

    // Assigns
    this.host = ip.address();
    this.app = params.app;
    this.level = params.level;
    this.component = Component;
    this.category = Category;
    this.type = Type;
    this.HttpStatus = HttpStatus;
  }

  /**
	 * Checks the input parameter.
	 * Logs the data.
	 * @param {object} params
	 * @param {string} params.code - Error code
	 * @param {string} params.description - Log description
	 * @param {string} params.component - Project component(DataStore/Queue/Application...)
	 * @param {string} params.category - Error category(ConnectionError/DataNotFoundError/ValidationError...)
	 * @param {string} params.type - Log type (Error/Debug)
	 * @param {object} params.ref - Log references
	*/
  log(params) {
    // Validates
    const rawParams = JSON.parse(JSON.stringify(params));
    const requiredParams = {
      code: {
        type: 'string',
        default: 'Unknown',
      },
      description: {
        type: 'string',
        default: 'Unknown',
      },
      component: {
        type: 'string',
        default: 'Unknown',
      },
      category: {
        type: 'string',
        default: 'Unknown',
      },
      type: {
        type: 'string',
        default: Type.Debug,
      },
      ref: {
        type: 'object',
        default: {},
      },
    };

    // Handles ref.body
    if (params.ref && Object.prototype.hasOwnProperty.call(params.ref, 'body')) {
      params.ref.bdy = params.ref.body;
      delete params.ref.body;
    }

    // Gets Runtime details
    const trace = stackTrace.get()[this.level];
    const path = trace.getFileName();
    const file = trace.getFileName() ? trace.getFileName().split('/').pop() : null;
    const method = trace.getFunctionName();
    const line = trace.getLineNumber();

    // Forms log object
    /* eslint valid-typeof:0 */
    const logData = {
      app: this.app,
      host: this.host,
      // code: rawParams.code ? rawParams.code : requiredParams.code.default,
      description: rawParams.description,
      component: (
        Object.keys(Component).map(k => Component[k])
      ).includes(rawParams.component) ? rawParams.component : requiredParams.component.default,
      category: (
        Object.keys(Category).map(k => Category[k])
      ).includes(rawParams.category) ? rawParams.category : requiredParams.category.default,
      type: (
        Object.keys(Type).map(k => Type[k])
      ).includes(rawParams.type) ? rawParams.type : requiredParams.type.default,
      code: (
        Object.keys(HttpStatus).map(k => HttpStatus[k])
      ).includes(rawParams.HttpStatus) ? rawParams.HttpStatus : requiredParams.type.default,
      ref: rawParams.ref,
      doc: rawParams.doc,
      path,
      file,
      method,
      line,
      ts: new Date().toISOString(),
    };

    // Serializes log
    const serializedLog = Log.serialize(logData);

    // Writes log
    Log.write(serializedLog);
  }
}

/** Exports */
module.exports = Logger;
