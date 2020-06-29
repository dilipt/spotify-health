import { SessionStoreImpl } from './SessionStore';
import Logger from 'bunyan';
import { HealthCheckSession, HealthCheckColour } from './types';

const noopLogger = new Logger({
  name: 'noop-logger',
  streams: [{
    path: '/dev/null',
  }]
});

const defaultSession: HealthCheckSession = {
  sessionId: 'test',
  sessionName: 'Test Session',
  participants: ['just me'],
  healthchecks: [{
    indicatorName: 'Code health',
    greenText: 'code is good',
    redText: 'code is bad',
    scores: [],
    trends: [],
  }]
}
  
describe('Session Store', () => {
  it('should store and retrieve a session', () => {
    const sessionStore = SessionStoreImpl(noopLogger);
    sessionStore.update(defaultSession);
    expect(sessionStore.get('test')).toEqual(defaultSession);
  });

  it('should remove a session', () => {
    const sessionStore = SessionStoreImpl(noopLogger);
    sessionStore.update(defaultSession);
    sessionStore.remove(defaultSession.sessionId);
    expect(sessionStore.get(defaultSession.sessionId)).toBeFalsy();
  })

  it('should return all sessions', () => {
    const sessionStore = SessionStoreImpl(noopLogger);
    sessionStore.update(defaultSession);
    const sessions = sessionStore.getAll();
    expect(sessions).toEqual([defaultSession]);
  })
});