import auth from './auth.route';
import healthcheck from './healthcheck.route';

const routes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  auth(app);
  healthcheck(app);
};

export default routes;
