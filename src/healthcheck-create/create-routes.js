const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const { HealthCheckBuilder } = require('./healthcheck-builder');

const HealthCheckCreatorRouter = ({ buildStore, sessionStore, log }) => {
  const createRouter = new Router({ prefix: '/healthchecks' });
  createRouter.use(BodyParser());

  createRouter.post('/', async (ctx) => {
    const healthcheckName = ctx.request.body.name;
    const builder = HealthCheckBuilder(healthcheckName);
    buildStore.put(builder);
    ctx.status = 202;
    ctx.body = builder.current();
  });

  createRouter.put('/:healthcheckId/indicators/:indicator', async (ctx) => {
    const builder = buildStore.get(ctx.params.healthcheckId);
    if (!builder) ctx.status = 404;
    else {
      builder.addIndicator(
        ctx.params.indicator,
        ctx.request.body.descriptionGreen,
        ctx.request.body.descriptionRed,
      );
      buildStore.put(builder);
      ctx.status = 202;
      ctx.body = builder.current();
    }
  });

  createRouter.delete('/:healthcheckId/indicators/:indicator', async (ctx) => {
    const builder = buildStore.get(ctx.params.healthcheckId);
    if (!builder) ctx.status = 404;
    else {
      builder.removeIndicator(ctx.params.indicator);
      buildStore.put(builder);
      ctx.status = 202;
      ctx.body = builder.current();
    }
  });

  createRouter.post('/:healthcheckId/done', async (ctx) => {
    const builder = buildStore.get(ctx.params.healthcheckId);
    if (!builder) ctx.status = 404;
    else {
      const healthcheck = builder.build();
      sessionStore.put(healthcheck);
      buildStore.delete(builder.id);
      ctx.status = 200;
      ctx.body = healthcheck;
    }
  });

  return createRouter;
};

module.exports = {
  HealthCheckCreatorRouter,
};
