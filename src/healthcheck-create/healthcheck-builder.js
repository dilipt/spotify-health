const uuid = require('uuid/v1');
const defaultIndicators = require('./default-indicators');
const { HealthCheck } = require('./models');

const HealthCheckBuilder = (name) => {
  const id = uuid().replace(/-/g, '');
  const healthcheck = {
    id,
    name,
    indicators: defaultIndicators,
  };

  function addIndicator(indicatorName, textAwesome, textCrap) {
    healthcheck.indicators = healthcheck
      .indicators
      .filter(indicator => indicator.name !== indicatorName);
    healthcheck.indicators.push({
      name: indicatorName,
      textAwesome,
      textCrap,
    });
    return this;
  }

  function removeIndicator(indicatorName) {
    healthcheck.indicators = healthcheck
      .indicators
      .filter(indicator => indicator.name !== indicatorName);
    return this;
  }

  function current() {
    return healthcheck;
  }

  function build() {
    return new HealthCheck({
      id: healthcheck.id,
      name: healthcheck.name,
      indicators: healthcheck.indicators,
    });
  }

  return {
    id,
    addIndicator,
    removeIndicator,
    current,
    build,
  };
};

module.exports = {
  HealthCheckBuilder,
};
