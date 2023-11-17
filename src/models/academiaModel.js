const mongoose = require('mongoose');

const academiaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
});

const Academia = mongoose.model('Academia', academiaSchema);

module.exports = Academia;
