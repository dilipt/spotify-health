const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa();
const base = new Router({ prefix: '/health' })

base.get('/', (ctx) => {
  ctx.body = 'Hello World!'
})

app.use(base.routes())

app.listen(3000)
console.log('app listening on 3000.')
