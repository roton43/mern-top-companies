const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
  name: String,
  sector: String,
  logo: String,
  headquarter: String,
  founded: String
});
module.exports = mongoose.model('Company', CompanySchema);