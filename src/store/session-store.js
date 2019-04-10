const InMemorySessionStore = () => {
  const sessions = new Map();

  function get(healthcheckId) {
    return sessions.get(healthcheckId);
  }

  function store(healthcheck) {
    sessions.set(healthcheck.id, healthcheck);
    return healthcheck.id;
  }

  function getAll() {
    return Array.from(sessions.values());
  }

  return {
    get,
    getAll,
    store,
  };
};

module.exports = {
  InMemorySessionStore,
};
