import { validationResult } from 'express-validator';

import db from '../models';

const User = db.user;
const { Op } = db.Sequelize;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next();
  } else {
    User.findOne({
      where: {
        [Op.or]: {
          username: req.body.username,
          email: req.body.email,
        },
      },
    })
      .then((user) => {
        if (user) {
          res.status(400).send({
            message: 'User is already in use',
          });
          return;
        }
        next();
      });
  }
};

export default {
  checkDuplicateUsernameOrEmail,
};
