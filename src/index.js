const Koa = require('koa')
const Router = require('koa-router')
const HealthCheck = require('./healthcheck')
const Session = require('./session')

const app = new Koa();
const base = new Router({ prefix: '/health' })
const session = Session.new()

base.get('/', (ctx) => {
  ctx.body = 'Hello World!'
})

base.post('/new', (ctx) => {
  const healthCheck = HealthCheck.new()
  session.add(healthCheck)
  ctx.body = 'OK'
})

app.use(base.routes())

app.listen(3000)
console.log('app listening on 3000.')
