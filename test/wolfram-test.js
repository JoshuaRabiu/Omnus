const request = require('supertest');
const {expect} = require('chai');

describe('The Wolfram Alpha Api', function(done) {
  it('Returns a 200 Response', function(done) {
    request('http://127.0.0.1:3001/wolfram-api')
      .post('/')
      .type('text')
      .send('Hello')
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('Can receive simple string queries and send back a spoken result', function(done) {
    request('http://127.0.0.1:3001/wolfram-api')
      .post('/')
      .type('text')
      //Returns a text response
      .send('Hello')
      .then(res => {
        expect(res.text).to.equal('Hello, human');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('Can get Wolfram Image results if there is no spoken query availale', function(done) {
    this.timeout(30000);
    request('http://127.0.0.1:3001/wolfram-api')
      .post('/')
      .type('text')
      //Returns an image response
      .send('Weather in San Francisco')
      .then(function(res) {
        expect(res.text.slice(0, 14)).to.equal('data:image/gif');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
  it(`Sends an error message if sent something it can't process`, function(done) {
    this.timeout(30000);
    request('http://127.0.0.1:3001/wolfram-api')
      .post('/')
      .type('text')
      //Sends an unintelligble string
      .send('JabbatheHutScript ES99 Generator Funyuns')
      .then(function(res) {
        expect(res.text).to.equal(`Sorry, I don't understand what you said.`);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
