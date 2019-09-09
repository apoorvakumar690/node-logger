/** Class Definition */
class Log {
  /**
	 * Serialize the data.
   *
	 * @param {object} log
	 * @param {string} log.app - App name
	 * @param {string} log.host - Host ip
	 * @param {string} log.code - Error code
	 * @param {string} log.description - Log description
	 * @param {string} log.component - Project component(DataStore/Queue/Application...)
	 * @param {string} log.category - Error category(ConnectionError/DataNotFoundError/ValidationError...)
	 * @param {string} log.type - Log type (Error/Debug)
	 * @param {string} log.ref - Log references
	 * @param {string} log.path - Path where logger called
	 * @param {string} log.file - File where logger called
 	 * @param {string} log.method - Method where logger called
	 * @param {string} log.line - Line where logger called
	 * @param {string} log.ts - Timestamp of logger called
	*/
  static serialize(log) {
    return JSON.stringify(log);
  }

  /**
	 * Calls the respective stdout or queue functions depending on out.type.
	 * @param {string} log - Stringified log
	 * @param {object} out - Logger output object
	*/
  static write(log) {
    setTimeout(() => {
      /* eslint no-console:0 */
      console.log(log);
    }, 0);
  }
}

/** Exports */
module.exports = Log;
