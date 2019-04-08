import * as Koa from 'koa';
import { HealthCheckFactoryImpl } from './factory';
import { SessionStoreImpl } from './session-store';
import { HealthCheckManagerImpl } from './manager';
import { HealthCheckRouter } from './routes';

const app = new Koa();
const healthcheckFactory = new HealthCheckFactoryImpl();
const sessionStore = new SessionStoreImpl();
const healthcheckManager = new HealthCheckManagerImpl(healthcheckFactory, sessionStore);
const healthcheckRouter = HealthCheckRouter(healthcheckManager);

app.use(healthcheckRouter.routes());
app.listen(3000);
console.log('app listening on 3000.')
