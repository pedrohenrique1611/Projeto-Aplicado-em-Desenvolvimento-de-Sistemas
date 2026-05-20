const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Criar profissional
router.post("/", (req, res) => {

  const {
    nome,
    especialidade,
    telefone,
    status
  } = req.body;

  const sql = `
    INSERT INTO profissionais
    (
      nome,
      especialidade,
      telefone,
      status
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome,
      especialidade,
      telefone,
      status
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Profissional criado"
      });
    }
  );

});

// Listar profissionais
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM profissionais",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);
    }
  );

});

// Atualizar profissional
router.put("/:id", (req, res) => {

  const {
    nome,
    especialidade,
    telefone,
    status
  } = req.body;

  const sql = `
    UPDATE profissionais
    SET
      nome = ?,
      especialidade = ?,
      telefone = ?,
      status = ?
    WHERE id_profissional = ?
  `;

  db.query(
    sql,
    [
      nome,
      especialidade,
      telefone,
      status,
      req.params.id
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Profissional atualizado"
      });
    }
  );

});

// Excluir profissional
router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM profissionais WHERE id_profissional = ?",
    [req.params.id],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Profissional removido"
      });
    }
  );

});

module.exports = router;