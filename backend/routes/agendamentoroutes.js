const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Criar agendamento
router.post("/", (req, res) => {
  const { usuario_id, profissional_id, servico_id, data, horario } = req.body;

  const sql = `
    INSERT INTO agendamentos 
    (usuario_id, profissional_id, servico_id, data, horario) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, profissional_id, servico_id, data, horario], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ msg: "Horário já reservado" });
      }
      return res.status(500).json(err);
    }

    res.json({ msg: "Agendamento criado" });
  });
});

// Listar agendamentos
router.get("/", (req, res) => {
  const sql = `
    SELECT a.*, u.nome AS usuario, p.nome AS profissional, s.nome_servico
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id_usuario
    JOIN profissionais p ON a.profissional_id = p.id_profissional
    JOIN servicos s ON a.servico_id = s.id_servico
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;