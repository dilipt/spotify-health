jest.mock('uuid/v1');
const uuid = require('uuid/v1');
const { HealthCheckManager } = require('./manager');
const { InMemorySessionStore } = require('./store');
const { HealthCheckFactory } = require('./factory');

const MockLogger = () => {
  const infoMessages = [];
  const warnMessages = [];

  function info(data, log) {
    infoMessages.push({ data, log });
  }

  function warn(data, log) {
    warnMessages.push({ data, log });
  }

  return { info, warn };
};

describe('HealthChecks integration tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create healthcheck', () => {
    uuid.mockImplementation(() => 'health-check-Id');
    const sessionStore = InMemorySessionStore({ log: MockLogger() });
    const healthcheckFactory = HealthCheckFactory({ log: MockLogger() });
    const healthcheckManager = HealthCheckManager({
      healthcheckFactory,
      sessionStore,
      log: MockLogger(),
    });

    const healthcheckId = healthcheckManager.createHealthCheck('test-check');

    expect(healthcheckId).toBe('healthcheckId');

    const healthcheck = sessionStore.get(healthcheckId);
    expect(healthcheck.id).toBe(healthcheckId);
    expect(healthcheck.name).toBe('test-check');
    expect(healthcheck.indicators.length).toBe(3);

    expect(healthcheckManager.getHealthCheck(healthcheckId)).toBe(healthcheck);
    expect(healthcheckManager.currentHealthChecks().length).toBe(1);
  });

  test('should throw error if healthcheck already exists', (done) => {
    uuid.mockImplementation(() => 'health-check-Id');
    const sessionStore = InMemorySessionStore({ log: MockLogger() });
    const healthcheckFactory = HealthCheckFactory({ log: MockLogger() });
    const healthcheckManager = HealthCheckManager({
      healthcheckFactory,
      sessionStore,
      log: MockLogger(),
    });

    const healthcheckId = healthcheckManager.createHealthCheck('check');
    expect(healthcheckId).toBe('healthcheckId');

    try {
      healthcheckManager.createHealthCheck('check');
      done.fail('should have thrown error');
    } catch (e) {
      expect(e.message).toBe('healthcheck already exists');
      done();
    }
  });
});
