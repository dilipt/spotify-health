import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser'

export const HealthCheckRouter = ({ sessionManager }) => {
  const base = new Router({ prefix: '/healthchecks' });
  base.use(BodyParser())
  
  base.get('/', async (ctx) => {
    ctx.body = sessionManager.current()
  })

  base.post('/new', async (ctx) => {
    const healthcheckId = sessionManager.store(ctx.request.body.name)
    ctx.status = 202
    ctx.body = JSON.stringify({ healthcheckId })
  })
  
  base.get('/:healthcheckId', async (ctx) => {
    ctx.body = JSON.stringify(sessionManager.get(ctx.params.healthcheckId))
  })
  
  base.post('/:healthcheckId/areas/:areaName/:score', async (ctx) => {
    const session = sessionManager.get(ctx.params.healthcheckId)
    session
      .areas
      .find(area => area.name === ctx.params.areaName)
      .scores.push(ctx.params.score)
  
    ctx.status = 202
    ctx.body = JSON.stringify(sessionManager.store(session))
  })

  return base;
}



