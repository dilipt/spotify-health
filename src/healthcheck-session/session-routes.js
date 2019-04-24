const Router = require('koa-router');

const SessionRouter = ({ sessionStore, log }) => {
  const router = new Router({ prefix: '/sessions' });

  router.get('/', async (ctx) => {
    const sessions = sessionStore.getAll();
    ctx.body = sessions;
    ctx.status = 200;
  });

  router.get('/:healthcheckId', async (ctx) => {
    const session = sessionStore.get(ctx.params.healthcheckId);
    if (!session) {
      log.warn({ healthcheckId: ctx.params.healthcheckId }, 'no healthcheck registered for given healthcheckId.');
      ctx.status = 404;
    } else {
      ctx.body = session;
      ctx.status = 200;
    }
  });

  return router;
};

module.exports = {
  SessionRouter,
};
