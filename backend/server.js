require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/api/usuarios", require("./routes/usuarioRoutes"));

// rota teste
app.get("/", (req, res) => {
  res.send("API funcionando 🔥");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));