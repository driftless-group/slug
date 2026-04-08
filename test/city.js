const path = require('path');
const mongoose = require('mongoose');

var slug = require(path.join(__dirname, '..'));

var Schema = mongoose.Schema;

const schema = new mongoose.Schema({ 
  name: {
    type: String
  },
  translations: {
    type: mongoose.Schema.Types.Mixed,
  },
  population: Number 
});

schema.plugin(slug, {attribute: 'name'});


module.exports.CitySchema = schema;


mongoose.models.City || mongoose.model('City', schema);
module.exports.City = mongoose.models.City;


