/* eslint-env mocha */
import request from 'supertest';
import expect from 'expect';
import bcrypt from 'bcryptjs';

import app from '../src';
import db from '../src/models';

beforeEach(async () => {
  await db.user.destroy({
    where: {},
    truncate: true,
  });
});

describe('/api/auth/signup', () => {
  it('should sign up new user', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        email: 'test@hoge.com',
        password: '12345678',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'User test was registerd successfully!',
        });
        db.user.findOne({
          where: {
            username: 'test',
          },
        })
          .then((user) => {
            expect(user.username).toEqual('test');
            expect(user.email).toEqual('test@hoge.com');
            expect(bcrypt.compareSync('12345678', user.password)).toBeTruthy();
          });
      })
      .end(done);
  });

  it('should not sign up duplicated username', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: '12345678',
    })
      .then(() => {
        request(app)
          .post('/api/auth/signup')
          .send({
            username: 'test',
            email: 'test1@hoge.com',
            password: '12345678',
          })
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'User is already in use',
            });
            db.user.count({
              where: {},
            })
              .then((count) => {
                expect(count).toEqual(1);
              });
          })
          .end(done);
      });
  });

  it('should not sign up duplicated email', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: '12345678',
    })
      .then(() => {
        request(app)
          .post('/api/auth/signup')
          .send({
            username: 'test1',
            email: 'test@hoge.com',
            password: '12345678',
          })
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'User is already in use',
            });
            db.user.count({
              where: {},
            })
              .then((count) => {
                expect(count).toEqual(1);
              });
          })
          .end(done);
      });
  });

  it('should not sign up new user without username field', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@hoge.com',
        password: '12345678',
      })
      .expect(422)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Invalid parameter'
        });
        db.user.count({
          where: {}
        })
          .then((count) => {
            expect(count).toEqual(0);
          })
      })
      .end(done);
  });

  it('should not sign up new user without email field', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        password: '12345678',
      })
      .expect(422)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Invalid parameter'
        });
        db.user.count({
          where: {}
        })
          .then((count) => {
            expect(count).toEqual(0);
          })
      })
      .end(done);
  });

  it('should not sign up new user without password field', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        email: 'test@hoge.com',
      })
      .expect(422)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Invalid parameter'
        });
        db.user.count({
          where: {}
        })
          .then((count) => {
            expect(count).toEqual(0);
          })
      })
      .end(done);
  });

  it('should not sign up new user with wrong email field', (done) => {
    request(app)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        email: 'testhoge.com',
        password: '12345678',
      })
      .expect(422)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Invalid parameter'
        });
        db.user.count({
          where: {}
        })
          .then((count) => {
            expect(count).toEqual(0);
          })
      })
      .end(done);
  });

});
