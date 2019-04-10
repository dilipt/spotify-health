const Scores = {
  Green: 1,
  Amber: 0,
  Red: -1,
};

const HealthCheckManager = ({ healthcheckFactory, sessionStore, log }) => {
  function createHealthCheck(name) {
    const healthcheck = healthcheckFactory.create(name);
    if (sessionStore.getAll().find(hc => hc.name === name)) {
      log.warn({ healthcheck: name }, 'healthcheck already exists.');
      throw Error('healthcheck already exists');
    }
    sessionStore.store(healthcheck);
    return healthcheck.id;
  }

  function getHealthCheck(id) {
    return sessionStore.get(id);
  }

  function currentHealthChecks() {
    return sessionStore.getAll().map(healthcheck => ({
      id: healthcheck.id,
      name: healthcheck.name,
      date: healthcheck.healthCheckDate,
    }));
  }

  function addScore(healthcheckId, area, score) {
    const healthcheck = sessionStore.get(healthcheckId);
    healthcheck.areas.find(a => a.name === area).scores.push(Scores[score]);
  }

  function addTrend(healthcheckId, area, score) {
    const healthcheck = sessionStore.get(healthcheckId);
    healthcheck.areas.find(a => a.name === area).trends.push(Scores[score]);
  }

  return {
    createHealthCheck,
    getHealthCheck,
    currentHealthChecks,
    addScore,
    addTrend,
  };
};

module.exports = {
  HealthCheckManager,
};
