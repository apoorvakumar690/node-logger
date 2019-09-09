# Logging module for NodeJS projects

### Logger Class

#### Fields

Parameters   |Type   | Description
-------------|-------|----------------
app*         |string | Name of the Jira key for the project
level        |number | Stack trace level

### Logger()

```js
// Creates a logger instance
new Logger({
  app:'BACK',
  level:1
})
```

#### Output

Param        |Type    | Description
-------------|--------|---------------
logger       |logger  |Logger instance

#### Throws Exception

Exception        |Type  | Description
-----------------|------|--------------
err              |error |Error if any

### log()

```js
  log({type, component, code, description, category, doc, ref}):
```

Creates a logger instance

#### Input Parameters

Param        |Type                  | Description
-------------|----------------------|---------------------------------------
type*        |type                  |Type of the log
component*   |component             |Component to which the log belongs
code*        |string                |HTML status Error code of the log
description* |string                |Description of the error
category*    |category              |Category of the log
doc          |string                |Documentation link relevant to the log
ref          |{}                    |Reference object for app-level details (multilevel object also supported)

### Log instance

#### Stdout

Param        |Type                  | Description
-------------|----------------------|---------------------------------------
host         |string                |Host Name of the running Application (IP/Container ID)
app          |string                |Application ID to identify the running Application
file         |string                |File Name of the originating error
method       |string                |Method Name of the originating error
line         |string                |Line number of the originating error
type         |type                  |Type of Log (Fatal, Warning, Error (S1, S2, S3), Info, Debug)
component    |component             |Originating Point of the Error
code         |string                |Error Code
description  |string                |Error Description
category     |category              |Error Category (Connection Error, Data Not Found Error, etc)
doc          |string                |Link for the documentation of the error
ts           |string                |Time at which the error occurred (UTC dd MMM, yyyy hh: mm: ss )
ref          |object                |Reference object for app-level details

## Usage Example

* **Logger Initialization.**

```js
    const Logger  = require('syi-nodelogger');
    const logger = new Logger({
        app:'jiraProjectCode',
        level:1
    });
    // Export logger as global function
```

* **Logging**

```js
    logger.log({
        category: logger.category.ConnectionError,
        code: logger.HttpStatus.ERROR,
        component: logger.component.ExternalServices,
        description: 'Unable to connect ETCD server',
        doc: 'link to documentation link if any',
        ref: {
            app: {
                version: '1.2.3'
            }
        },
        type: logger.type.Fatal
    });
```

* **Logger assignment**

```js
    // Update application name
    logger.app = 'SYIF'
    // Log stack trace
    logger.level = 2
```
