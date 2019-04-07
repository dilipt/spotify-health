import { Area } from './Area'

export interface HealthCheck {
  name: string
  id: string
  healthCheckDate: Date
  areas: Area[]
}
