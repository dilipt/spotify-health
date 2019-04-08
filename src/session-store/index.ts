import { SessionStoreImpl } from './session-store';
import { HealthCheck } from '../models';

interface SessionStore {
  store(healthcheck: HealthCheck): string
  get(healthcheckId: string): HealthCheck
  getAll(): Array<HealthCheck>
}

export {
  SessionStore,
  SessionStoreImpl
}