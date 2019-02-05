import { HealthCheck } from "./HealthCheck";

const sessions = new Map<string, HealthCheck>()

export function current() {
  return Array
    .from(sessions.values())
    .map(session => ({ id: session.id, name: session.name, date: session.healthCheckDate }))
}

export function get(healthcheckId: string): HealthCheck {
  return sessions.get(healthcheckId)
}

export function store(healthcheck: HealthCheck): string {
  sessions.set(healthcheck.id, healthcheck)
  return healthcheck.id
}
