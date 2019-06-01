const uuid = require('uuid/v1');
const defaultIndicators = require('./default-indicators');

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
    healthcheck.startDate = new Date().getTime();
    healthcheck.indicators = healthcheck.indicators.map(indicator => ({
      ...indicator,
      scores: [],
      trends: [],
      participants: [],
    }));
    return healthcheck;
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
