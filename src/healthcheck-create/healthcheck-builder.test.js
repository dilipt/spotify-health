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

  test('should create default healthcheck', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const hc = HealthCheckBuilder('my-check').build();

    expect(hc.name).toBe('my-check');
    expect(hc.id).toBe('healthcheckId');
    expect(hc.indicators.length).toBe(3);
    hc.indicators.forEach((indicator) => {
      expect(indicator.scores).toEqual([]);
      expect(indicator.trends).toEqual([]);
    });
  });

  test('should add extra indicators', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const builder = HealthCheckBuilder('my-other-check');
    const hc = builder
      .addIndicator('Quality', 'Quality description')
      .current();

    expect(hc.indicators.length).toBe(4);
    expect(hc.indicators.map(ind => ind.name)).toContain('Quality');
  });

  test('should remove indicators too', () => {
    uuid.mockImplementation(() => 'healthcheckId');

    const builder = HealthCheckBuilder('checkliest');
    const hc = builder
      .removeIndicator('Learning')
      .current();

    expect(hc.indicators.length).toBe(2);
    expect(hc.indicators.find(ind => ind.name === 'Learning')).toBeUndefined();
  });
});
