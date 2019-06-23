const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const SessionRouter = ({ sessionStore, socketManager, log }) => {
  const router = new Router({ prefix: '/sessions' });
  router.use(BodyParser());

  router.get('/', async (ctx) => {
    const sessions = sessionStore.getAll();
    ctx.body = sessions;
    ctx.status = 200;
  });

  router.use('/:healthcheckId', async (ctx, next) => {
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

  router.get('/:healthcheckId', async (ctx) => {
    const participantPasskey = ctx.query.passkey;
    const validParticipant = ctx.state.session.participants.some(
      p => p.passkey === participantPasskey,
    );

    if (validParticipant) {
      ctx.status = 404;
      ctx.body = { message: 'healthcheck not found.' };
    }
    ctx.body = ctx.state.session;
    ctx.status = 200;
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

module.exports = {
  SessionRouter,
};
