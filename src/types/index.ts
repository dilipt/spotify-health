import { defaultIndicators } from './default-indicators';

export type HealthCheckSession = {
  sessionId: string,
  sessionName: string,
  participants: string[],
  healthchecks: HealthIndicator[],
};

export type HealthIndicator = {
  indicatorName: string,
  greenText: string,
  redText: string,
  scores: HealthCheckColour[],
  trends: HealthCheckColour[],
}

export enum HealthCheckColour {
  RED,
  AMBER,
  GREEN,
}

export const DefaultIndicators = defaultIndicators;