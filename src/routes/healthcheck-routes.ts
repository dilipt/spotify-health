import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser'
import { HealthCheckManager } from '../manager'

export const HealthCheckRouter = (healthcheckManager: HealthCheckManager) => {
  const base = new Router({ prefix: '/healthchecks' });
  base.use(BodyParser())
  
  base.get('/', async (ctx) => {
    ctx.body = healthcheckManager.currentHealthChecks()
  })

  base.post('/new', async (ctx) => {
    const healthcheckId = healthcheckManager.createHealthCheck(ctx.request.body.name);
    ctx.status = 202
    ctx.body = JSON.stringify({ healthcheckId })
  })
  
  base.get('/:healthcheckId', async (ctx) => {
    ctx.body = JSON.stringify(healthcheckManager.getHealthCheck(ctx.params.healthcheckId))
  })
  
  base.post('/:healthcheckId/areas/:areaName/:score', async (ctx) => {
    const session = healthcheckManager.addScore(ctx.params.healthcheckId, ctx.params.areaName, ctx.params.score)
    ctx.status = 202
  })

  return base;
}



