const Koa = require('koa');
const Bunyan = require('bunyan');
const { HealthCheckFactory } = require('./factory');
const { SessionStore } = require('./session-store');
const { HealthCheckManager } = require('./manager');
const { HealthCheckRouter } = require('./routes');

const log = Bunyan.createLogger({ name: 'spotify-health' });
const app = new Koa();
const healthcheckFactory = HealthCheckFactory({ log });
const sessionStore = SessionStore({ log });
const healthcheckManager = HealthCheckManager({ healthcheckFactory, sessionStore, log });
const healthcheckRouter = HealthCheckRouter({ healthcheckManager, log });

app.use(healthcheckRouter.routes());
app.listen(3000);
log.info('app listening on 3000.');
