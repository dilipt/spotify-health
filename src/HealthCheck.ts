import { Area } from './Area'
import * as uuid from 'uuid/v1'

export interface HealthCheck {
  name: string
  id: string
  healthCheckDate: Date
  areas: Area[]
}

export function create(name: string): HealthCheck {
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
