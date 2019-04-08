import { HealthCheck } from "../models";
import { SessionStore } from ".";

export class SessionStoreImpl implements SessionStore {
  private sessions: Map<string, HealthCheck>

  constructor() {
    this.sessions = new Map<string, HealthCheck>();
  }

  get(healthcheckId: string): HealthCheck {
    return this.sessions.get(healthcheckId);
  }

  store(healthcheck: HealthCheck): string {
    this.sessions.set(healthcheck.id, healthcheck);
    return healthcheck.id;
  }

  getAll(): Array<HealthCheck> {
    return Array.from(this.sessions.values())
  }
}
