const HealthCheck = require('./healthcheck')

describe('healthcheck management', () => {
  describe('should create new healthcheck', () => {
    let hc;
    beforeAll(() => {
      hc = HealthCheck.new()
    })

    test('should have a uuid id', () => {
      expect(hc.id).toMatch(/[\d|_]*/)
    })

    test('should have empty healthcheck', () => {
      expect(hc.areas).toEqual([
        { name: 'Learning', scores: [], trends: [] },
        { name: 'Speed', scores: [], trends: [] },
        { name: 'Codebase', scores: [], trends: [] },
      ])
    })
  })
})
