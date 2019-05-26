const InMemoryCreatorStore = ({ log }) => {
  const creations = new Map();

  function put(builder) {
    if (!builder.id) throw Error('build has no id present');
    creations.set(builder.id, builder);
    log.info({ healthchecks: [...creations.keys()] }, 'storing healthcheck session.');
  }

  function get(id) {
    return creations.get(id);
  }

  function remove(id) {
    creations.delete(id);
  }

  return {
    put,
    get,
    delete: remove,
  };
};

module.exports = {
  InMemoryCreatorStore,
};
