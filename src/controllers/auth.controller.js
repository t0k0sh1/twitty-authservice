import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import db from '../models';
import config from '../config/auth.config';

const User = db.user;
const { Op } = db.Sequelize;

const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: 'Invalid parameter' });
  } else {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        res.send({ message: `User ${user.username} was registerd successfully!` });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

const signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: 'Invalid parameter' });
  } else {
    User.findOne({
      where: {
        [Op.or]: {
          username: req.body.username,
          email: req.body.username,
        },
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password,
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            message: 'Invalid password',
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24hours
        });

        return res.status(200).send({
          username: user.username,
          email: user.email,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

export default {
  signup,
  signin,
};
