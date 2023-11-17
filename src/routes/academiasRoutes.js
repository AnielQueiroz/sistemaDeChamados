const express = require("express");
const router = express.Router();
const Academia = require("../models/academiaModel");

// Rota para buscar uma academia pelo ID
router.get("/:id", async (req, res) => {
  try {
    const academia = await Academia.findOne({ id: req.params.id });
    console.log(academia);
    if (!academia) {
      return res.status(404).json({ message: "Academia não encontrada" });
    }
    // res.json({ nome: academia.nome });
    res.json(academia);
  } catch (error) {
    console.error("Erro ao buscar a academia:", error);
    res.status(500).json({ message: "Erro ao buscar a academia" });
  }
});

router.get("/", async (req, res) => {
  try {
    const academias = await Academia.find();
    res.json(academias);
    console.log(academias);
  } catch (error) {
    console.error("Erro ao buscar as academias:", error);
    res.status(500).json({ message: "Erro ao buscar as academias" });
  }
});

module.exports = router;
