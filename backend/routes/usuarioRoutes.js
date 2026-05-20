const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LISTAR USUÁRIOS
router.get("/", (req, res) => {

  db.query(
    "SELECT id_usuario, nome, email FROM usuarios",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);
    }
  );

});

// CADASTRO
router.post("/register", async (req, res) => {

  const {
    nome,
    email,
    senha
  } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  const sql = `
    INSERT INTO usuarios
    (nome, email, senha)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [nome, email, hash],
    (err) => {

      if (err)
        return res.status(400).json(err);

      res.json({
        msg: "Usuário criado"
      });
    }
  );

});

// LOGIN
router.post("/login", (req, res) => {

  const {
    email,
    senha
  } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, result) => {

      if (err)
        return res.status(500).json(err);

      if (result.length === 0) {

        return res.status(400).json({
          msg: "Usuário não encontrado"
        });
      }

      const usuario = result[0];

      const valid = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!valid) {

        return res.status(400).json({
          msg: "Senha inválida"
        });
      }

      const token = jwt.sign(
        { id: usuario.id_usuario },
        "segredo"
      );

      res.json({ token });

    }
  );

});

module.exports = router;