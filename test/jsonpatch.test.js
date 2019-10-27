import { expect, chaiWithHttp } from './fixture';
import app from '../src/server/express';

const baseUrl = '/api/v1/jsonPatch';

describe('test user json patch functionality', () => {
  let token = null;
  before('this test suite runs, login a user in order to access protected routes', (done) => {
    chaiWithHttp
      .request(app)
      .post('/api/v1/login')
      .send({ username: 'test', password: 'passwOrD#23' })
      .end((err, res) => {
        token = res.body.token;
        done(err);
      });
  });

  context('if a user attempts to patch a resource without providing an auth token', () => {
    it('should throw an unauthorized error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .send({
          patch: [{ op: 'replace', path: '/username', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('No authorization token was found');
          done(err);
        });
    });
  });

  context('if a user attempts to patch a resource by providing an invalid auth token', () => {
    const invalidToken = 'eyJhbGyciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpYnV1a2EiLCJpYXQiOjE1NzIxNzU4MDUsImV4cCI6MTU3MjI2MjIwNX0.a_MUXNJ-Ppa5sjalD-p4G088hioklWjuDNjYgXH4Qi0';
    it('should throw an invalid token error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${invalidToken}` })
        .send({
          patch: [{ op: 'replace', path: '/username', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('invalid token');
          done(err);
        });
    });
  });
  context('if a user attempts to patch a resource without providing a document to patch', () => {
    it('should throw a document required error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          patch: [{ op: 'replace', path: '/username', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('document property is required and must be of type JSON!');
          done(err);
        });
    });
  });

  context('if a user attempts to patch a resource without providing a patch array', () => {
    it('should throw a patch array required error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          document: {
            username: 'test',
            password: 'password',
          },
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('patch property is required and must be of type JSON!');
          done(err);
        });
    });
  });

  context('if a user attempts to patch a resource by providing an op that is not currently supported by the implementation', () => {
    it('should throw an un supported op error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          document: {
            username: 'test',
            password: 'password',
          },
          patch: [{ op: 'move', path: '/username', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('op property only supports add, replace and remove operations!');
          done(err);
        });
    });
  });

  context('if a user attempts to patch a resource by providing a path that is not currently supported by the implementation', () => {
    it('should throw an un supported op error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          document: {
            username: 'test',
            password: 'password',
          },
          patch: [{ op: 'replace', path: '/email', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('path property only supports /username and /password paths!');
          done(err);
        });
    });
  });

  context('if a user attempts to patch a resource by providing valid json patch properties', () => {
    it('should throw an un supported op error', (done) => {
      chaiWithHttp
        .request(app)
        .patch(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          document: {
            username: 'test',
            password: 'password',
          },
          patch: [{ op: 'replace', path: '/username', value: 'michael' }],
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal('object patch successful!');
          expect(res.body.data).to.own.property('username');
          done(err);
        });
    });
  });
});
