const Koa = require('koa');
const Bunyan = require('bunyan');
const http = require('http');
const cors = require('@koa/cors');
const { InMemorySessionStore } = require('./session-store');
const { InMemoryCreatorStore } = require('./build-store');
const { CreatorRouter } = require('./healthcheck-create');
const { SessionManager, SessionRouter } = require('./healthcheck-session');

const log = Bunyan.createLogger({ name: 'spotify-health' });
const buildStore = InMemoryCreatorStore({ log });
const sessionStore = InMemorySessionStore();
const creatorRouter = CreatorRouter({ buildStore, sessionStore, log });
const sessionRouter = SessionRouter({ sessionStore, log });

const app = new Koa();
app.use(creatorRouter.routes());
app.use(sessionRouter.routes());
app.use(cors());

const httpServer = http.createServer(app.callback());
const sessionManager = SessionManager({ httpServer, sessionStore, log });

httpServer.listen(3000);
log.info('app listening on 3000.');
