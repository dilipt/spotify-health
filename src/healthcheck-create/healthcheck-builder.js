const uuid = require('uuid/v1');

const HealthCheckBuilder = (name) => {
  const id = uuid().replace(/-/g, '');
  const healthcheck = {
    id,
    name,
    indicators: [{
      name: 'Learning', textAwesome: 'green Learning description', textCrap: 'red Learning description',
    }, {
      name: 'Speed', textAwesome: 'Speed description', textCrap: 'red Speed description',
    }, {
      name: 'Codebase', textAwesome: 'Codebase description', textCrap: 'red Codebase description',
    }],
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
