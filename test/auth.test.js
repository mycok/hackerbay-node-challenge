import { expect, chaiWithHttp } from './fixture';
import app from '../src/server/express';

const baseUrl = '/api/v1/login';

describe('test user login functionality', () => {
  context('if a user attempts to login by providing less than the required two fields', () => {
    it('should throw a required fields error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 'test-user' })
        .end((err, res) => {
          expect(res.body.error).to.equal('login requires only two properties that is username and password!');
          expect(res.body.sample.username).to.equal('sample-name');
          expect(res.body.sample.password).to.equal('sample-password');
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing more than the required two fields', () => {
    it('should throw a required fields error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 'test-user', password: 'testPass#45rty', email: 'test@gmail.com' })
        .end((err, res) => {
          expect(res.body.error).to.equal('login requires only two properties that is username and password!');
          expect(res.body.sample.username).to.equal('sample-name');
          expect(res.body.sample.password).to.equal('sample-password');
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing a non required field email', () => {
    it('should throw a required fields error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ email: 'test@gmail.com', password: 'testPass#45rty' })
        .end((err, res) => {
          expect(res.body.error).to.equal('both username and password fields are required!');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });


  context('if a user attempts to login by providing an invalid field name instead of username', () => {
    it('should throw a required fields error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ name: 'test-user' })
        .end((err, res) => {
          expect(res.body.error).to.equal('login requires only two properties that is username and password!');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing a username with less than the required three characters', () => {
    it('should throw an invalid username error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 't', password: 'passWoRd#56' })
        .end((err, res) => {
          expect(res.body.error).to.equal('username must be atleast three characters long!');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing a password with less than eight characters', () => {
    it('should throw an invalid password error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 'test', password: 'passwor' })
        .end((err, res) => {
          expect(res.body.error).to.equal('A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing an eight character password but missing an uppercase and a special character', () => {
    it('should throw an invalid password error', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 'test', password: 'longpassword' })
        .end((err, res) => {
          expect(res.body.error).to.equal('A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });

  context('if a user attempts to login by providing valid login credentials', () => {
    it('should successfully login the user', (done) => {
      chaiWithHttp
        .request(app)
        .post(baseUrl)
        .send({ username: 'test', password: 'longpAsswOrd#94' })
        .end((err, res) => {
          expect(res.body.success).to.equal('test is now logged in!');
          expect(res.body).to.have.own.property('token');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
});
