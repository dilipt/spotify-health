const uuid = require('uuid/v1');

const HealthCheckBuilder = (name) => {
  const id = uuid().replace(/-/g, '');
  const healthcheck = {
    id,
    name,
    indicators: [{
      name: 'Learning', descriptionGreen: 'green Learning description', descriptionRed: 'red Learning description',
    }, {
      name: 'Speed', descriptionGreen: 'Speed description', descriptionRed: 'red Speed description',
    }, {
      name: 'Codebase', descriptionGreen: 'Codebase description', descriptionRed: 'red Codebase description',
    }],
  };

  function addIndicator(indicatorName, descriptionGreen, descriptionRed) {
    healthcheck.indicators.push({
      name: indicatorName,
      descriptionGreen,
      descriptionRed,
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
