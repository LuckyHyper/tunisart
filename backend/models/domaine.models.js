const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DomaineSchema = new Schema({
  icon: { type: String, required: true },
  domaine_name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('domaine', DomaineSchema);
