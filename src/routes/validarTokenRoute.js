const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/token", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    return res.status(200).json({ msg: "Token válido" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Token inválido ou expirado!" });
  }
});

module.exports = router;
