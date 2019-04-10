const Koa = require('koa');
const Bunyan = require('bunyan');
const http = require('http');
const { HealthCheckFactory } = require('./factory');
const { InMemorySessionStore } = require('./store');
const { HealthCheckManager } = require('./manager');
const { HealthCheckRouter } = require('./routes');

const log = Bunyan.createLogger({ name: 'spotify-health' });
const healthcheckFactory = HealthCheckFactory({ log });
const sessionStore = InMemorySessionStore({ log });
const healthcheckManager = HealthCheckManager({ healthcheckFactory, sessionStore, log });
const healthcheckRouter = HealthCheckRouter({ healthcheckManager, log });

const app = new Koa();
app.use(healthcheckRouter.routes());
http.createServer(app.callback()).listen(3000);
log.info('app listening on 3000.');
