const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const { HealthCheckBuilder } = require('./healthcheck-builder');

const CreatorRouter = ({
  buildStore, sessionStore, socketManager, log,
}) => {
  const createRouter = new Router({ prefix: '/creator' });
  createRouter.use(BodyParser());

  createRouter.post('/new', async (ctx) => {
    const healthcheckName = ctx.request.body.name;
    const builder = HealthCheckBuilder(healthcheckName);
    buildStore.put(builder);
    ctx.status = 202;
    ctx.body = builder.current();
  });

  createRouter.use('/:healthcheckId/', async (ctx, next) => {
    log.info({ healthcheckId: ctx.params.healthcheckId }, 'fetching healthcheck...');
    const builder = buildStore.get(ctx.params.healthcheckId);
    if (!builder) {
      ctx.status = 404;
      ctx.body = { message: 'healthcheck not found.' };
    } else {
      ctx.state.builder = builder;
      await next();
    }
  });

  createRouter.put('/:healthcheckId/indicators/:indicator', async (ctx) => {
    const { builder } = ctx.state;
    builder.addIndicator(
      ctx.params.indicator,
      ctx.request.body.textAwesome,
      ctx.request.body.textCrap,
    );
    buildStore.put(builder);
    ctx.status = 202;
    ctx.body = builder.current();
  });

  createRouter.delete('/:healthcheckId/indicators/:indicator', async (ctx) => {
    const { builder } = ctx.state;
    builder.removeIndicator(ctx.params.indicator);
    buildStore.put(builder);
    ctx.status = 202;
    ctx.body = builder.current();
  });

  createRouter.post('/:healthcheckId/done', async (ctx) => {
    const { builder } = ctx.state;
    const healthcheck = builder.build();
    sessionStore.put(healthcheck);
    buildStore.delete(builder.id);
    socketManager.createNamespace(healthcheck.id);
    ctx.status = 200;
    ctx.body = healthcheck;
  });

  return createRouter;
};

module.exports = {
  CreatorRouter,
};
