const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Funcionario = require("../models/funcionarioModel");
const funcionariosController = require("../controllers/funcionariosController");

// Rota para buscar um funcionario pelo nome
router.get("/:username", async (req, res) => {
  try {
    const funcionario = await Funcionario.findOne(
      {
        username: req.params.username,
      },
      "-password"
    );
    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }
    // res.json({ nome: academia.nome });
    res.json(funcionario);
  } catch (error) {
    console.error("Erro ao buscar o funcionario:", error);
    res.status(500).json({ message: "Erro ao buscar o funcionario" });
  }
});

router.post("/funcionario", checkToken, async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const decode = jwt.decode(token);
  const id = decode.id;

  try {
    // Verificar se o funcionario existe
    const funcionario = await Funcionario.findById(id, "-password");

    res.status(200).json({ funcionario });
  } catch (error) {
    return res.status(404).json({ msg: "Erro ao buscar funcionário" });
  }
});

router.get("/", async (req, res) => {
  try {
    const funcionarios = await Funcionario.find({}, "-password");
    res.json(funcionarios);
  } catch (error) {
    console.error("Erro ao buscar os funcionarios:", error);
    res.status(500).json({ message: "Erro ao buscar os funcionarios" });
  }
});

router.post(
  "/cadastrar-funcionario",
  funcionariosController.cadastrarFuncionario
);
router.post("/login", funcionariosController.loginFuncionario);

//Verificar o Token
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Token inválido!" });
  }
}
module.exports = router;
