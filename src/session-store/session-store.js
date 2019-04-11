const InMemorySessionStore = () => {
  const sessions = new Map();

  function get(healthcheckId) {
    return sessions.get(healthcheckId);
  }

  function put(healthcheck) {
    sessions.set(healthcheck.id, healthcheck);
    return healthcheck.id;
  }

  function remove(healthcheckId) {
    sessions.delete(healthcheckId);
  }

  function getAll() {
    return Array.from(sessions.values());
  }

  return {
    get,
    getAll,
    put,
    delete: remove,
  };
};

module.exports = {
  InMemorySessionStore,
};
