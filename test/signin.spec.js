/* eslint-env mocha */
import request from 'supertest';
import expect from 'expect';
import bcrypt from 'bcryptjs';

import app from '../src';
import db from '../src/models';

beforeEach(async () => {
  await db.user.destroy({
    where: {},
    truncate: true
  })
})

describe('/api/auth/signin', () => {
  it('should sign in exists user with username', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            username: 'test',
            password: '12345678'
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.username).toEqual('test');
            expect(res.body.email).toEqual('test@hoge.com');
            expect(res.body.accessToken).not.toBeNull();
          })
          .end(done);
      })
  })

  it('should sign in exists user with email', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            username: 'test@hoge.com',
            password: '12345678'
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.username).toEqual('test');
            expect(res.body.email).toEqual('test@hoge.com');
            expect(res.body.accessToken).not.toBeNull();
          })
          .end(done);
      })
  })

  it('should not sign in not exists', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            username: 'test1',
            password: '12345678'
          })
          .expect(404)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'User not found'
            })
          })
          .end(done);
      })
  })

  it('should not sign in invalid password', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            username: 'test',
            password: '87654321'
          })
          .expect(401)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'Invalid password'
            })
          })
          .end(done);
      })
  })

  it('should not sign in without username field', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            password: '12345678'
          })
          .expect(422)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'Invalid parameter'
            })
          })
          .end(done);
      })
  })

  it('should not sign in without password field', (done) => {
    db.user.create({
      username: 'test',
      email: 'test@hoge.com',
      password: bcrypt.hashSync('12345678', 8),
    })
      .then(() => {
        request(app)
          .post('/api/auth/signin')
          .send({
            username: 'test'
          })
          .expect(422)
          .expect((res) => {
            expect(res.body).toEqual({
              message: 'Invalid parameter'
            })
          })
          .end(done);
      })
  })
})