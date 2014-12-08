//=============================================================================
// COMPANY SCHEMA
//=============================================================================
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: String
});

/*module.exports = mongoose.model('CompanySchema', {
	//glowingCompanyUUID: {type: Boolean, required: true },   -> acho que o db gera o uuid. é permitido o type  ObjectId
	//backOfficeCompanyId: {type: Boolean, required: true },
	//name: {type: String, required: true, unique: true },
	name: String
	//cnpj: {type: String, required: true, min: 14, max: 14, unique: true, validate: validator},
	//cnpj: {type: String, required: true, min: 14, max: 14, unique: true},
	//active: {type: Boolean, required: true }
}); */

/*CompanySchema.path('name').set(function (value) {
  return capitalize(value);
});

CompanySchema.pre('set', function (next, path, val, typel) {  
  this.emit('set', path, val);  
  next();
});

function validator (val) {
  return val == 'something';
}*/

module.exports = mongoose.model('CompanySchema', CompanySchema);