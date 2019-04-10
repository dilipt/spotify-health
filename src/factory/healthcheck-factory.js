const uuid = require('uuid/v1');

const HealthCheckFactory = ({ log }) => {
  function create(name) {
    const healthcheckId = uuid().replace(/-/g, '');
    log.info({ healthcheckId }, 'creating new healthcheck');
    return {
      name,
      id: healthcheckId,
      healthCheckDate: new Date(),
      areas: [{
        name: 'Learning', description: 'Learning description', scores: [], trends: [],
      }, {
        name: 'Speed', description: 'Speed description', scores: [], trends: [],
      }, {
        name: 'Codebase', description: 'Codebase description', scores: [], trends: [],
      }],
    };
  }

  return { create };
};

module.exports = {
  HealthCheckFactory,
};
