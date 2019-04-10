const uuid = require('uuid/v1');

const HealthCheckFactory = ({ log }) => {
  const healthcheck = {};

  function init(name) {
    const healthcheckId = uuid().replace(/-/g, '');
    healthcheck.name = name;
    healthcheck.id = healthcheckId;
    healthcheck.startDate = new Date();
    healthcheck.indicators = [{
      name: 'Learning', description: 'Learning description', scores: [], trends: [],
    }, {
      name: 'Speed', description: 'Speed description', scores: [], trends: [],
    }, {
      name: 'Codebase', description: 'Codebase description', scores: [], trends: [],
    }];
    log.info({ healthcheckId }, 'initialising new healthcheck');
    return this;
  }

  function addIndicator(name, description) {
    healthcheck.indicators.push({
      name,
      description,
      scores: [],
      trends: [],
    });
    return this;
  }

  function removeIndicator(name) {
    healthcheck.indicators = healthcheck.indicators.filter(indicator => indicator.name !== name);
    return this;
  }

  function build() {
    return healthcheck;
  }

  return {
    init,
    addIndicator,
    removeIndicator,
    build,
  };
};

module.exports = {
  HealthCheckFactory,
};
