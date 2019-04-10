jest.mock('uuid/v1');
const uuid = require('uuid/v1');
const { HealthCheckFactory } = require('./healthcheck-factory');

const MockLogger = () => {
  function info() {}
  return { info };
};

describe('HealthCheckFactory', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create default healthcheck', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const factory = HealthCheckFactory({ log: MockLogger() });

    const hc = factory
      .init('my-check')
      .build();

    expect(hc.name).toBe('my-check');
    expect(hc.id).toBe('healthcheckId');
    expect(hc.indicators.length).toBe(3);
  });

  test('should add extra indicators', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const factory = HealthCheckFactory({ log: MockLogger() });

    const hc = factory
      .init('my-check')
      .addIndicator('Quality', 'Quality description')
      .build();

    expect(hc.indicators.length).toBe(4);
  });

  test('should remove indicators too', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const factory = HealthCheckFactory({ log: MockLogger() });

    const hc = factory
      .init('checky-checkerson')
      .removeIndicator('Learning')
      .build();

    expect(hc.indicators.length).toBe(2);
  });
});
