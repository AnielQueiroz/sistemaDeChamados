const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Configurações do servidor Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco de dados com Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida.');
});

// Configuração das rotas
const loginRoutes = require("./src/routes/loginRoutes");
const chamadosRoutes = require("./src/routes/chamadosRoutes");
const validaToken = require("./src/routes/validarTokenRoute");
const academias = require("./src/routes/academiasRoutes");
const funcionarios = require("./src/routes/funcionariosRoutes");


app.use("/", loginRoutes);
app.use("/login", loginRoutes);
app.use("/chamados", chamadosRoutes);
// app.use("/chamados/registrarChamado", chamadosRoutes)
app.use("/academias", academias)
app.use("/funcionarios", funcionarios);
app.use("/valida", validaToken)

// app.use(
//   express.static(path.join(__dirname, "/src/scripts/"), {
//     setHeaders: (res, path) => {
//       if (path.endsWith(".js")) {
//         res.setHeader("Content-Type", "text/javascript");
//       }
//     },
//   })
// );

// Configuração dos arquivos estáticos
app.use('/scripts', express.static(path.join(__dirname, 'src', 'scripts')));

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
