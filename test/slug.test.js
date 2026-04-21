const path = require('path');
const assert = require('assert');

const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

if (process.env.MONGO_URL == undefined) {
  require('dotenv').config({path: path.join(__dirname, '.env')});
}

require('@drifted/db');
const {City} = require(path.join(__dirname, 'city'));

const {
  exception
} = require('@drifted/qa');


describe('slug', function() {
  it('should create a slug', function(done) {
    var city = new City({name: 'New Orleans'});
    try {
      city.save().then(() => {
        assert.equal(city.slug, 'new-orleans')
        done();
      }).catch(exception(done));
    } catch(error) {
      console.log(error);
      done();
    }
  })
})
