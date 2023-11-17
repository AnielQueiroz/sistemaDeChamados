const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;
