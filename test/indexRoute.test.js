import { expect, chaiWithHttp } from './fixture';
import app from '../src/server/express';

const baseUrl = '/';

describe('test index route of the app', () => {
  it('should redirect to the swagger documentation page', (done) => {
    chaiWithHttp
      .request(app)
      .get(baseUrl)
      .end((err, res) => {
        expect(res).to.redirect;
        done(err);
      });
  });
});
