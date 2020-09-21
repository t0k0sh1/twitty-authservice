import { body } from 'express-validator';

import controller from '../controllers/auth.controller';
import verifySignUp from '../middleware/verifySignUp';

export default (app) => {
  app.post(
    '/api/auth/signup',
    [
      body('username').notEmpty(),
      body('email').notEmpty().isEmail(),
      body('password').notEmpty(),
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup,
  );

  app.post(
    '/api/auth/signin',
    [
      body('username').notEmpty(),
      body('password').notEmpty(),
    ],
    controller.signin,
  )
};
