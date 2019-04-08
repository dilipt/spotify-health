import { Score, HealthCheck } from "../models";
import { HealthCheckManagerImpl } from './healthcheck-manager'

interface HealthCheckManager {
  createHealthCheck(name: string): string
  getHealthCheck(id: string): HealthCheck
  currentHealthChecks()
  addScore(healthcheckId: string, area: string, score: Score)
  addTrend(healthcheckId: string, area: string, score: Score)
}

export {
  HealthCheckManager,
  HealthCheckManagerImpl
}