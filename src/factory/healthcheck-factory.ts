import * as uuid from 'uuid/v1';
import { HealthCheck } from '../models';

const HealthCheckFactory = () => {
  const create = (name: string): HealthCheck => {
    return {
      name,
      id: uuid(),
      healthCheckDate: new Date(),
      areas: [
        { name: 'Learning', scores: [], trends: [] },
        { name: 'Speed', scores: [], trends: [] },
        { name: 'Codebase', scores: [], trends: [] },
      ]
    }
  }

  return { create }
}

export {
  HealthCheckFactory
}
