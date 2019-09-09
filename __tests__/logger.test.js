const Logger = require('../index.js');
const logger = new Logger({ app: 'IAM'});

describe('logger.initialize', () => {
  it('throws error if application name not provided', () => {
    expect(() => {
      new Logger({});
    }).toThrow();
  });
});

describe('logger.initialize', () => {
  it('log', () => {
    logger.log({
      type: logger.type.Fatal,
      code: 'ERROR.APP.INIT',
      description: 'This is a fatal error.',
      category: logger.category.ConnectionError,
      component: logger.component.Application,
      doc: "https://confluence.bms.bz/display/BMS20/BR+-+Logging+Philosophy",
      ref: {
        a: 1,
        b: 2,
        body: {
          data: {
            ip: "0.0.0.0"
          }
        }
      },
    });
  });
  it('default', () => {
    const param = {
      code: 'ERROR.APP.INIT',
      description: 'This is a fatal error.',
      ref: {},
    };
    logger.log(param);
  });
});
