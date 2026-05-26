const path = require('path');
const mongoose = require('mongoose');

var slug = require(path.join(__dirname, '..'));

var Schema = mongoose.Schema;

const schema = new mongoose.Schema({ 
  first_name: String,
  last_name: String
});

schema.plugin(slug, {attribute: ['first_name','last_name']});


module.exports.PersonSchema = schema;


mongoose.models.Person || mongoose.model('Person', schema);
module.exports.Person = mongoose.models.Person;


