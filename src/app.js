const Koa = require('koa');
const Bunyan = require('bunyan');
const http = require('http');
const cors = require('@koa/cors');
const { InMemorySessionStore } = require('./session-store');
const { InMemoryCreatorStore } = require('./build-store');
const { CreatorRouter } = require('./healthcheck-create');
const { SocketManager, SessionRouter } = require('./healthcheck-session');

const log = Bunyan.createLogger({ name: 'spotify-health' });
const buildStore = InMemoryCreatorStore({ log });
const sessionStore = InMemorySessionStore();
const creatorRouter = CreatorRouter({
  buildStore, sessionStore, socketManager: SocketManager, log,
});
const sessionRouter = SessionRouter({ sessionStore, socketManager: SocketManager, log });

const app = new Koa();
app.use(cors());
app.use(creatorRouter.routes());
app.use(sessionRouter.routes());

const httpServer = http.createServer(app.callback());
SocketManager.init({ httpServer, sessionStore, logger: log });

httpServer.listen(3001);
log.info('app listening on 3001.');
