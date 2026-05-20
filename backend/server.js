require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());

// ROTAS
app.use(
  "/api/usuarios",
  require("./routes/usuarioRoutes")
);

app.use(
  "/api/agendamentos",
  require("./routes/agendamentoRoutes")
);

app.use(
  "/api/pagamentos",
  require("./routes/pagamentoRoutes")
);

app.use(
  "/api/servicos",
  require("./routes/servicoRoutes")
);

app.use(
  "/api/profissionais",
  require("./routes/profissionalRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// rota teste
app.get("/", (req, res) => {
  res.send("API funcionando 🔥");
});

app.listen(3000, () =>
  console.log("Servidor rodando na porta 3000")
);