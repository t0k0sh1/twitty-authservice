/* eslint-env mocha */
import request from 'supertest';
import expect from 'expect';
import app from '../src';

describe('/api/auth/healthcheck', () => {
  it('should be response OK', (done) => {
    request(app)
      .get('/api/auth/healthcheck')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'OK',
        });
      })
      .end(done);
  });
});
