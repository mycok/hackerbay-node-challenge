import { expect, chaiWithHttp } from './fixture';
import app from '../src/server/express';

const baseUrl = '/api/v1/thumbnail';

describe('test image download and resize functionality', () => {
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

  context('if a user attempts to download and resize an image without providing an auth token', () => {
    it('should throw an unauthorized error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ imageUrl: 'https://www.bigfoto.com/ship-sculpture.jpg' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('No authorization token was found');
          done(err);
        });
    });
  });

  context('if a user attempts to download and resize an image by providing an invalid auth token', () => {
    const invalidToken = 'eyJhbGyciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtpYnV1a2EiLCJpYXQiOjE1NzIxNzU4MDUsImV4cCI6MTU3MjI2MjIwNX0.a_MUXNJ-Ppa5sjalD-p4G088hioklWjuDNjYgXH4Qi0';
    it('should throw an invalid token error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .set({ Authorization: `Bearer ${invalidToken}` })
        .send({ imageUrl: 'https://www.bigfoto.com/ship-sculpture.jpg' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('invalid token');
          done(err);
        });
    });
  });
  context('if a user attempts to download and resize an image by providing image key instead of imageUrl key', () => {
    it('should throw an imageUrl is required error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({ image: 'https://www.bigfoto.com/ship-sculpture.jpg' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('An imageUrl property is required!');
          done(err);
        });
    });
  });

  context('if a user attempts to download and resize an image by providing a valid imageUrl', () => {
    it('should successfully download and resize the image', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({ imageUrl: 'https://www.bigfoto.com/ship-sculpture.jpg' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal('image resize successful!');
          done(err);
        });
    });
  });

  context('if a user attempts to download and resize an image by providing an unsupported imageUrl', () => {
    it('should throw an unable to download image error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .set({ Authorization: `Bearer ${token}` })
        .send({ imageUrl: 'https://unsplash.com/photos/odxB5oIG_iA/download?force=true' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Unable to download image, please verify that the provided image url has an image name and extension attached!');
          done(err);
        });
    });
  });
});
