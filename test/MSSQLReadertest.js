const chai = require('chai'),
    eventEmitter = require('events').EventEmitter;

chai.should();

describe('MSSQLReader', ()=>{

  let options,
      query;

  beforeEach(()=>{
    options = new eventEmitter();
    query = `select 1`
  })

  it('throws an error when no options provided', () => {
      let query = `select 1`;
      let MSSQLReader = require('../index');
      (()=>{
        MSSQLReader();
      }).should.throw(Error,'options must be provided');
  });

  it('throws an error when no query is provided', () => {
      let MSSQLReader = require('../index');
      (()=>{
        MSSQLReader({});
      }).should.throw(Error,'query must be provided');
  });

  it('emits an error if no server specified', (done) => {

      let MSSQLReader = require('../index');
      options.on('error', function(error, payload, fatal) {
          error.message.should.equal('server must be defined');
          fatal.should.be.true;
          done();
      });

      MSSQLReader(options,query);

  });

  it('emits an error if no port is specified', (done) => {

      let MSSQLReader = require('../index');
      options.server = 'localhost';
      options.on('error', function(error, payload, fatal) {
          error.message.should.equal('port must be a number greater than 0');
          fatal.should.be.true;
          done();
      });
      MSSQLReader(options,query);
  });

  it('emits an error if zero port is specified', (done) => {

      let MSSQLReader = require('../index');
      options.server = 'localhost';
      options.port = 0;
      options.on('error', function(error, payload, fatal) {
          error.message.should.equal('port must be a number greater than 0');
          fatal.should.be.true;
          done();
      });
      MSSQLReader(options,query);
  });

  it('emits an error if negative port is specified', (done) => {

      let MSSQLReader = require('../index');
      options.server = 'localhost';
      options.port = -1;
      options.on('error', function(error, payload, fatal) {
          error.message.should.equal('port must be a number greater than 0');
          fatal.should.be.true;
          done();
      });
      MSSQLReader(options,query);
  });

  it('emits an error if non numeric port is specified', (done) => {

      let MSSQLReader = require('../index');
      options.server = 'localhost';
      options.port = 'HI';
      options.on('error', function(error, payload, fatal) {
          error.message.should.equal('port must be a number greater than 0');
          fatal.should.be.true;
          done();
      });
      MSSQLReader(options,query);
  });


    it('emits an error if no db user is specified', (done) => {

        let MSSQLReader = require('../index');
        options.server = 'localhost';
        options.port = 80;
        options.on('error', function(error, payload, fatal) {
            error.message.should.equal('user must be defined');
            fatal.should.be.true;
            done();
        });
        MSSQLReader(options,query);
    });

    it('emits an error if no password is specified', (done) => {

        let MSSQLReader = require('../index');
        options.server = 'localhost';
        options.port = 80;
        options.user = 'admin'
        options.on('error', function(error, payload, fatal) {
            error.message.should.equal('password must be defined');
            fatal.should.be.true;
            done();
        });
        MSSQLReader(options,query);
    });


    it('emits an error if no database is specified', (done) => {

        let MSSQLReader = require('../index');
        options.server = 'localhost';
        options.port = 80;
        options.user = 'admin';
        options.password = 'admin';
        options.on('error', function(error, payload, fatal) {
            error.message.should.equal('database must be defined');
            fatal.should.be.true;
            done();
        });
        MSSQLReader(options,query);
    });

})
