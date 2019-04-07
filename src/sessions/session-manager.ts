import { HealthCheck } from "../models";

export const SessionManager = ({ healthcheckFactory }) => {
  const sessions = new Map<string, HealthCheck>();

  const get = (healthcheckId: string): HealthCheck => {
    return sessions.get(healthcheckId);
  }

  const store = (name: string): string => {
    const healthcheck = healthcheckFactory.create(name)
    sessions.set(healthcheck.id, healthcheck);
    return healthcheck.id;
  }

  const current = () => Array
    .from(sessions.values())
    .map(session => ({ id: session.id, name: session.name, date: session.healthCheckDate }));
  
  return { get, store, current };
}
