const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const SessionRouter = ({ sessionStore, log }) => {
  const router = new Router({ prefix: '/sessions' });
  router.use(BodyParser());

  router.get('/', async (ctx) => {
    const sessions = sessionStore.getAll();
    ctx.body = sessions;
    ctx.status = 200;
  });

  router.use(async (ctx, next) => {
    const session = sessionStore.get(ctx.params.healthcheckId);
    if (!session) {
      ctx.status = 404;
    } else {
      ctx.state.session = session;
      await next();
    }
  });

  router.get('/:healthcheckId', async (ctx) => {
    ctx.body = ctx.state.session;
    ctx.status = 200;
  });

  router.put('/:healthcheckId/participants/', async (ctx) => {
    const { session } = ctx.state;
    session.participants.push(ctx.request.body);
  });

  return router;
};

module.exports = {
  SessionRouter,
};
