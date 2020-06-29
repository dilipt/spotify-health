import Logger from 'bunyan';
import { HealthCheckSession } from './types';
import { DefaultIndicators } from './types';

export interface SessionStore {
  create: (healthcheckId: string, sessionName: string) => HealthCheckSession
  update: (session: HealthCheckSession) => void
  get: (sessionId: string) => HealthCheckSession
  getAll: () => HealthCheckSession[]
  remove: (sessionId: string) => void
}

export const SessionStoreImpl = (logger: Logger): SessionStore => {
  const sessions = new Map<string, HealthCheckSession>();

  const create = (healthcheckId: string, sessionName: string): HealthCheckSession => {
    const session: HealthCheckSession = {
      sessionId: healthcheckId,
      sessionName,
      participants: [],
      healthchecks: DefaultIndicators.map(indicator => ({
        indicatorName: indicator.name,
        greenText: indicator.textAwesome,
        redText: indicator.textCrap,
        scores: [],
        trends: []
      })),
    };
    sessions.set(healthcheckId, session);
    return session;
  };

  const update = (session: HealthCheckSession): void => {
    logger.info({ sessionId: session.sessionId }, 'storing healthcheck session.');
    sessions.set(session.sessionId, session);
  }

  const get = (sessionId: string): HealthCheckSession => sessions.get(sessionId);

  const getAll = (): HealthCheckSession[] => Array.from(sessions.values());

  const remove = (sessionId: string): void => {
    logger.info({ sessionId, }, 'removing healthcheck session.');
    sessions.delete(sessionId);
  }

  return {
    create,
    update,
    get,
    getAll,
    remove,
  };
};
