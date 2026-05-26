const path = require('path');
const assert = require('assert');

const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

if (process.env.MONGO_URL == undefined) {
  require('dotenv').config({
    path: path.join(__dirname, '..', 'config','.env.'+process.env.NODE_ENV)
  });
}

require('@drifted/db');
const {Person} = require(path.join(__dirname, 'Person'));

const {
  exception
} = require('@drifted/qa');

//console.log('MONGO_URL', process.env.MONGO_URL);

describe('slug:attrs', function() {
  after((done) => {
    Person.deleteMany({}).then(() => {
      done();
    })
  })

  it('should create a slug from multiple attrs', function(done) {
    var person = new Person({first_name: 'Scott', last_name: 'Ballantyne'});
    try {
      person.save().then(() => {
        assert.equal(person.slug, 'scott-ballantyne')
        done();
      }).catch(exception(done));
    } catch(error) {
      console.log(error);
      done();
    }
  })
})
