const Koa = require('koa');
const Bunyan = require('bunyan');
const http = require('http');
const { InMemorySessionStore } = require('./session-store');
const { InMemoryHealthCheckBuildStore } = require('./build-store');
const { HealthCheckCreatorRouter } = require('./healthcheck-create');

const log = Bunyan.createLogger({ name: 'spotify-health' });
const sessionStore = InMemorySessionStore({ log });
const buildStore = InMemoryHealthCheckBuildStore();
const creatorRouter = HealthCheckCreatorRouter({ buildStore, sessionStore, log });

const app = new Koa();
app.use(creatorRouter.routes());
http.createServer(app.callback()).listen(3000);
log.info('app listening on 3000.');
