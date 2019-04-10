const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const HealthCheckRouter = ({ healthcheckManager }) => {
  const healthchecks = new Router({ prefix: '/healthchecks' });
  healthchecks.use(BodyParser());

  healthchecks.get('/', async (ctx) => {
    ctx.body = healthcheckManager.currentHealthChecks();
  });

  healthchecks.post('/new', async (ctx) => {
    const healthcheckId = healthcheckManager.createHealthCheck(ctx.request.body.name);
    ctx.status = 202;
    ctx.body = { healthcheckId };
  });

  healthchecks.get('/:healthcheckId', async (ctx) => {
    ctx.body = healthcheckManager.getHealthCheck(ctx.params.healthcheckId);
  });

  healthchecks.post('/:healthcheckId/areas/:areaName/:score', async (ctx) => {
    healthcheckManager.addScore(ctx.params.healthcheckId, ctx.params.areaName, ctx.params.score);
    ctx.status = 202;
  });

  return healthchecks;
};

module.exports = {
  HealthCheckRouter,
};
