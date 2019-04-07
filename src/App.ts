import * as Koa from 'koa';
import { HealthCheckFactory } from './factory';
import { SessionManager } from './sessions';
import { HealthCheckRouter } from './routes';

const app = new Koa()
const healthcheckFactory = HealthCheckFactory()
const sessionManager = SessionManager({ healthcheckFactory })
const healthcheckRouter = HealthCheckRouter({ sessionManager })

app.use(healthcheckRouter.routes())
app.listen(3000)
console.log('app listening on 3000.')
