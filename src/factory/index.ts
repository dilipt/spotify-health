import { HealthCheckFactoryImpl } from './healthcheck-factory';
import { HealthCheck } from '../models';

interface HealthCheckFactory {
  create(name: string): HealthCheck
}

export {
  HealthCheckFactory,
  HealthCheckFactoryImpl
}
