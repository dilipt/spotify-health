import { Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Logger from 'bunyan';
import { SessionStore } from './SessionStore';
import { HealthCheckSession } from './types';

export const SessionRouter = (sessionStore: SessionStore, socketManager: any, log: Logger): Router => {
  const router = new Router({ prefix: '/sessions' });
  router.use(bodyParser());

  router.get('/', async (ctx: Context) => {
    const sessions = sessionStore.getAll();
    ctx.body = sessions;
    ctx.status = 200;
  });

  router.post('/:healthcheckId', async (ctx: Context) => {
    const existingSession = sessionStore.get(ctx.params.healthcheckId);
    if (existingSession) {
      ctx.status = 400
      ctx.body = 'session already in progress.'
    } else {
      const { sessionName } = ctx.request.body;
      const session = sessionStore.create(ctx.params.healthcheckId, sessionName);
      ctx.status = 201;
      ctx.body = session;
    }
  });

  router.post('/:healthcheckId/start', async (ctx: Context) => {
    const session: HealthCheckSession = ctx.request.body;
    sessionStore.update(session);
    socketManager.createNamespace(session.sessionName);
    ctx.status = 200;
    ctx.body = session;
  });

  router.use('/:healthcheckId', async (ctx: Context, next: Function) => {
    log.info({ healthcheckId: ctx.params.healthcheckId }, 'fetching healthcheck...');
    const session = sessionStore.get(ctx.params.healthcheckId);
    if (!session) {
      ctx.status = 404;
      ctx.body = { message: 'healthcheck not found.' };
    } else {
      ctx.state.session = session;
      await next();
    }
  });

  router.get('/:healthcheckId', async (ctx: Context) => {
    const participantPasskey: string = ctx.query.passkey;
    const validParticipant = ctx.state.session.participants.some(
      (p: any) => participantPasskey !== 'undefined' && p.passkey === participantPasskey,
    );

    log.info({ validParticipant }, 'validParticipant');
    if (!validParticipant) {
      ctx.status = 404;
      ctx.body = { message: 'healthcheck not found.' };
    } else {
      ctx.body = ctx.state.session;
      ctx.status = 200;
    }
  });

  router.put('/:healthcheckId/participants', async (ctx) => {
    const { session } = ctx.state;
    const participant = session.addParticipant(ctx.request.body);
    socketManager.newParticipant(ctx.params.healthcheckId, participant);
    ctx.status = 201;
    ctx.body = participant;
  });

  return router;
};
