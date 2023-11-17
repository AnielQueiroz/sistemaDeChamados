const mongoose = require('mongoose');

const chamadoSchema = new mongoose.Schema({
  idAnalista: String,
  analista: String,
  data: String,
  hora: String,
  canal: String,
  solicitante: String,
  academia: String,
  teamviewer: String,
  problema: String,
  solucao: String,
});

const Chamado = mongoose.model('Chamado', chamadoSchema);

module.exports = Chamado;
