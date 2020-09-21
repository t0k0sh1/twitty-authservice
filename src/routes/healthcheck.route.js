import controller from '../controllers/healthcheck.controller';

export default (app) => {
  app.get(
    '/api/auth/healthcheck',
    controller.healthcheck,
  );
};
