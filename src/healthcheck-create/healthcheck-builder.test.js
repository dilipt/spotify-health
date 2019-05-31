jest.mock('uuid/v1');
const uuid = require('uuid/v1');
const { HealthCheckBuilder } = require('./healthcheck-builder');

describe('HealthCheckBuilder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should initialise and set healthcheckId', () => {
    uuid.mockImplementation(() => 'my-little-id');

    const builder = HealthCheckBuilder('sup');
    expect(builder.id).toBe('mylittleid');
  });

  test('should build healthcheck with score and trend collectors', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const hc = HealthCheckBuilder('my-check').build();

    expect(hc.name).toBe('my-check');
    expect(hc.id).toBe('healthcheckId');
    expect(hc.indicators.length).toBe(10);
    hc.indicators.forEach((indicator) => {
      expect(indicator.scores).toEqual([]);
      expect(indicator.trends).toEqual([]);
    });
  });

  test('should add extra indicators', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const builder = HealthCheckBuilder('my-other-check');
    const hc = builder
      .addIndicator('Quality', 'Quality description', 'Quality crap desc')
      .current();

    expect(hc.indicators.length).toBe(11);
    expect(hc.indicators.map(ind => ind.name)).toContain('Quality');
  });

  test('adding same indicator name should overwrite previous', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const builder = HealthCheckBuilder('another-check');
    const hc = builder
      .addIndicator('Kwality', 'Kwality 1', 'another')
      .addIndicator('Kwality', 'Kwality 2', 'another 2')
      .current();

    expect(hc.indicators.find(indicator => indicator.name === 'Kwality').textAwesome).toEqual('Kwality 2');
    expect(hc.indicators.find(indicator => indicator.name === 'Kwality').textCrap).toEqual('another 2');
  });

  test('should remove indicators too', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const builder = HealthCheckBuilder('checkliest');
    const hc = builder
      .removeIndicator('Learning')
      .current();

    expect(hc.indicators.length).toBe(9);
    expect(hc.indicators.find(ind => ind.name === 'Learning')).toBeUndefined();
  });
});
