import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as BodyParser from 'koa-bodyparser'
import { create } from './HealthCheck'

const app = new Koa()
app.use(BodyParser())

const base = new Router({ prefix: '/health' })

base.get('/', (ctx) => {
  ctx.body = 'Hello World!'
})

base.post('/new', (ctx) => {
  const healthcheck = create(ctx.request.body.name)
  ctx.body = JSON.stringify({ id: healthcheck.id })
})

app.use(base.routes())
app.listen(3000)
console.log('app listening on 3000.')
