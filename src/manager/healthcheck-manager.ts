import { HealthCheckFactory } from '../factory'
import { SessionStore } from '../session-store'
import { HealthCheckManager } from './'
import { Score, HealthCheck } from '../models';

export class HealthCheckManagerImpl implements HealthCheckManager {
  private healthcheckFactory: HealthCheckFactory;
  private sessionStore: SessionStore;

  constructor(healthcheckFactory: HealthCheckFactory, sessionStore: SessionStore) {
    this.healthcheckFactory = healthcheckFactory;
    this.sessionStore = sessionStore;
  }

  createHealthCheck(name: string): string {
    const healthcheck = this.healthcheckFactory.create(name);
    this.sessionStore.store(healthcheck);
    return healthcheck.id;
  }  
  
  getHealthCheck(id: string): HealthCheck {
    return this.sessionStore.get(id);
  }

  currentHealthChecks(): Array<{id: string, name: string, date: Date }> {
    return this.sessionStore.getAll().map(healthcheck => ({
      id: healthcheck.id,
      name: healthcheck.name,
      date: healthcheck.healthCheckDate
    }));
  }

  addScore(healthcheckId: string, area: string, score: Score) {
    const healthcheck = this.sessionStore.get(healthcheckId);
    healthcheck.areas.find(a => a.name === area).scores.push(score);
  }

  addTrend(healthcheckId: string, area: string, score: Score) {
    const healthcheck = this.sessionStore.get(healthcheckId);
    healthcheck.areas.find(a => a.name === area).trends.push(score);
  }
}
