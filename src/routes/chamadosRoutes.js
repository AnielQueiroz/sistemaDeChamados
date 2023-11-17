const express = require("express");
const router = express.Router();
const path = require("path");

const chamadosController = require("../controllers/chamadosController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/chamados.html"));
});

router.post('/registrar-chamado', chamadosController.registrarChamado);

// Outras rotas de chamados...

module.exports = router;
