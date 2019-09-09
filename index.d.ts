// Type definitions for bms-nodelogger
// Project: https://confluence.bms.bz/display/BMS20/BR+-+Logging+Philosophy
// Definitions by: Andan H M <andan.h@bookmyshow.com>
// Definitions: https://stash.bms.bz/projects/BMS/repos/nodelogger/browse/index.d.ts
// Change log : https://stash.bms.bz/projects/BMS/repos/nodelogger/browse/CHANGELOG.md

/**
 * bms-nodelogger is a simple wrapper to do logging policy defined as per BMS 2.0
 * @module bms-nodelogger
 *
 * Methods:
 * - [ * ] bms-logger.Logger
 *
 * If this module is a UMD module that exposes a global variable 'logger' when
 * loaded outside a module loader environment
 */
export as namespace logger;

/** Indicates the component of the application, where the error has occurred */
interface IComponent {
  /**  Includes error occurring at SQL/NoSQL databases, in-memory data stores, etc. */
  Datastore,
  /** includes error occurring at any queueing technology like RabbitMQ, Kafka, etc */
  Queue,
  /** includes error occurring at services hosted within BookMyShow domain. */
  InternalServices,
  /**  includes error occurring at services hosted outside BookMyShow domain. */
  ExternalServices,
  /**  includes error occurring anywhere inside the application which is not a part of the above mentioned components. */
  Application,
}

/** Indicates the category of Error */
interface ICategory {
  /** destination endpoint not being reachable, either due to incorrect host/ip or the destination endpoint being down. */
  ConnectionError,
  /** Resulted when the host takes too long to reply resulting in connection timeout. */
  TimeoutError,
  /**Resulted from data missing from lookup. */
  DataNotFoundError,
  /** Resulted during parsing serialized data.*/
  ParseError,
  /** Resulted from handled exceptions during request data validations.*/
  ValidationError,
  /** Un-handled exceptions or not possible to identify the category of the error. */
  UnknownError,
}

/** Indicates the type of log */
interface IType {
  /** Errors prevent any further operations.*/
  Fatal,
  /** warnings might lead to fatal error. */
  Warning,
  /**indicate that the current operation has failed due to a critical error and similar future operations might also fail */
  Errsev1,
  /**occurrence beyond a set threshold limit for a given time interval qualifies it as a critical error */
  Errsev2,
  /**non critical errors, which were validated against conditions (business-logic) and purposely failed. */
  Errsev3,
  /**app informational level logs. */
  Info,
  /** debug level logs, to view the intermediate states of an operation*/
  Debug,
}

/**
 * This declaration specifies that the logger class constructor function is the exported object from the file
 */
export = Logger;

/** Initializes the instance variables. */
declare class Logger {

  /**
   * The application ID which is sending the log */
  public app: string;
  /**
   * The host name or ip address where the source application is hosted
   **/
  public host: string;
  /**
   * Stack trace level*/
  public level: number;
  /**
   * This indicates the category of Error
   **/
  public category: ICategory;
  /**
   * This indicates the component of the application, where the error has occurred*/
  public component: IComponent;
  /**
   * Indicates the type of log
   **/
  public type: IType;

  /**
   * Initializes the instance variables.
   * constructor may causes a compile error, if invalid parameter passed */
  constructor(object?: {
    /**
     * The application ID which is sending the log */
    app: String,
    /**
     * Stack trace level (default is 1) */
    level?: Number
  }): Error;

  /**
   * Return error if invalid boolean type provided
   * */
  log(params: {
    /**
     * The Error Code */
    code: String,
    /**
     * Indicates the component of the application,
     * where the error has occurred */
    component: IComponent,
    /**
     * Indicates the category of Error */
    category: ICategory,
    /**
     * Indicates the type of log */
    type: IType,
    /**
     * The Error Description */
    description: String,
    /**
     * Link for the documentation which has details about the error code,
     * the cause and the possible resolution steps. */
    doc?: String,
    /**
     * The reference additional information (ID, request)
     * */
    ref?: Object,
  }): void;
}
