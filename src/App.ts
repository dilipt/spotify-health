import Koa from 'koa';
import Logger, { createLogger } from 'bunyan';
import { createServer } from 'http';
import cors from '@koa/cors';
import { SessionStoreImpl } from './SessionStore';
import { SessionRouter } from './SessionRouter';
import { SocketManagerImpl } from './SocketManager';

const log: Logger = createLogger({ name: 'spotify-health' });
const app = new Koa();
app.use(cors());

const start = () => {
  const httpServer = createServer(app.callback());
  const sessionStore = SessionStoreImpl(log);
  const socketManager = SocketManagerImpl(httpServer, log);
  const sessionRouter = SessionRouter(sessionStore, socketManager, log);
  app.use(sessionRouter.routes());
  httpServer.listen(3001);
  log.info('app listening on 3001.');
};

export default {
  start,
};
