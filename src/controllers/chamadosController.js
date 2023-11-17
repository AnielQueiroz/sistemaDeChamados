const Chamado = require('../models/chamadoModel');

exports.registrarChamado = async (req, res) => {
  try {
    const { idAnalista, analista, data, hora, canal, solicitante, academia, teamviewer, problema, solucao } = req.body;

    const chamado = new Chamado({
      idAnalista: idAnalista,
      analista: analista,
      data: data,
      hora: hora,
      canal: canal,
      solicitante: solicitante,
      academia: academia,
      teamviewer: teamviewer,
      problema: problema,
      solucao: solucao,
    });

    console.log(chamado);
    await chamado.save();
    res.status(201).json({ message: 'Chamado registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao registrar o chamado.' });
  }
};
