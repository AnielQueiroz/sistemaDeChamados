const Funcionario = require("../models/funcionarioModel.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.cadastrarFuncionario = async (req, res) => {
  const { name, username, password, confirmPassword } = req.body;

  // Validations
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!username) {
    return res.status(422).json({ msg: "O nome de usuário é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // Check if user exists
  const userExits = await Funcionario.findOne({ username: username });

  if (userExits) {
    return res
      .status(422)
      .json({ msg: "Por favor, utilize outro nome de usuário!" });
  }

  // Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const funcionario = new Funcionario({
    name: name,
    username: username,
    password: passwordHash,
  });

  try {
    await funcionario.save();
    res.status(201).json({ message: "Funcionario cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
};

exports.loginFuncionario = async (req, res) => {
  const { username, password } = req.body;

  // Validations
  if (!username) {
    return res.status(422).json({ msg: "O nome de usuário é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // Check if user exists
  const funcionario = await Funcionario.findOne({ username: username });

  if (!funcionario) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // Check if password match
  const checkPassword = await bcrypt.compare(password, funcionario.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: funcionario._id,
      },
      secret
    );

    res
      .status(200)
      .json({ message: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao gerar o token, tente novamente mais tarde!" });
  }
};
