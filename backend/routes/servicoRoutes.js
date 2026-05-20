const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Criar serviço
router.post("/", (req, res) => {

  const {
    nome_servico,
    descricao,
    preco,
    duracao_minutos
  } = req.body;

  const sql = `
    INSERT INTO servicos
    (
      nome_servico,
      descricao,
      preco,
      duracao_minutos
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome_servico,
      descricao,
      preco,
      duracao_minutos
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Serviço criado"
      });
    }
  );

});

// Listar serviços
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM servicos",
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);
    }
  );

});

// Atualizar serviço
router.put("/:id", (req, res) => {

  const {
    nome_servico,
    descricao,
    preco,
    duracao_minutos
  } = req.body;

  const sql = `
    UPDATE servicos
    SET
      nome_servico = ?,
      descricao = ?,
      preco = ?,
      duracao_minutos = ?
    WHERE id_servico = ?
  `;

  db.query(
    sql,
    [
      nome_servico,
      descricao,
      preco,
      duracao_minutos,
      req.params.id
    ],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Serviço atualizado"
      });
    }
  );

});

// Excluir serviço
router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM servicos WHERE id_servico = ?",
    [req.params.id],
    (err) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        msg: "Serviço removido"
      });
    }
  );

});

module.exports = router;