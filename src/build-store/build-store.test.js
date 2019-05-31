const { InMemoryCreatorStore } = require('./build-store');

const mockLog = { log: { info: jest.fn() } };

describe('InMemoryBuildStore', () => {
  test('should put and get build', () => {
    const store = InMemoryCreatorStore(mockLog);
    store.put({ id: 'hello', name: 'world' });
    expect(store.get('hello')).toEqual({ id: 'hello', name: 'world' });
  });

  test('should return undefined if no build for id', () => {
    const store = InMemoryCreatorStore(mockLog);
    expect(store.get('nonexistent')).toBeUndefined();
  });

  test('should delete builds too', () => {
    const store = InMemoryCreatorStore(mockLog);
    store.put({ id: 'sup', name: 'dilip' });
    store.delete('sup');
    expect(store.get('sup')).toBeUndefined();
  });

  test('should throw Error if no id present', (done) => {
    const store = InMemoryCreatorStore(mockLog);
    try {
      store.put({ hello: 'world' });
      done.fail('should have thrown Error');
    } catch (e) {
      expect(e.message).toContain('build has no id present');
      done();
    }
  });
});
