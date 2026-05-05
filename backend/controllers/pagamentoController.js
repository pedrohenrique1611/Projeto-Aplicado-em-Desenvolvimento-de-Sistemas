const db = require("../config/db");

exports.criarPagamento = (req, res) => {
  const { agendamento_id, metodo_pagamento, valor } = req.body;

  const sql = `
    INSERT INTO pagamentos 
    (agendamento_id, metodo_pagamento, valor, status_pagamento, data_pagamento)
    VALUES (?, ?, ?, 'Pago', NOW())
  `;

  db.query(sql, [agendamento_id, metodo_pagamento, valor], (err) => {
    if (err) return res.status(500).json(err);

    // Atualiza status do agendamento
    db.query(
      "UPDATE agendamentos SET status = 'Confirmado' WHERE id_agendamento = ?",
      [agendamento_id]
    );

    res.json({ msg: "Pagamento realizado" });
  });
};