import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as BodyParser from 'koa-bodyparser'
import { create } from './HealthCheck'
import * as Session from './Session'

const app = new Koa()
app.use(BodyParser())

const base = new Router({ prefix: '/healthchecks' })

base.get('/', async (ctx) => {
  ctx.body = Session.current()
})

base.post('/new', async (ctx) => {
  const healthcheckId = Session.store(create(ctx.request.body.name))
  ctx.status = 202
  ctx.body = JSON.stringify({ healthcheckId })
})

base.get('/:healthcheckId', async (ctx) => {
  ctx.body = JSON.stringify(Session.get(ctx.params.healthcheckId))
})

base.post('/:healthcheckId/areas/:areaName/:score', async (ctx) => {
  const session = Session.get(ctx.params.healthcheckId)
  session
    .areas
    .find(area => area.name === ctx.params.areaName)
    .scores.push(ctx.params.score)

  ctx.status = 202
  ctx.body = JSON.stringify(Session.store(session))
})

app.use(base.routes())
app.listen(3000)
console.log('app listening on 3000.')
