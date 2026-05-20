const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {

  try {

    const queries = {

      usuarios: `
        SELECT COUNT(*) AS total
        FROM usuarios
      `,

      agendamentos: `
        SELECT COUNT(*) AS total
        FROM agendamentos
      `,

      servicos: `
        SELECT COUNT(*) AS total
        FROM servicos
      `,

      profissionais: `
        SELECT COUNT(*) AS total
        FROM profissionais
      `,

      faturamento: `
        SELECT IFNULL(SUM(valor), 0) AS total
        FROM pagamentos
      `
    };

    db.query(
      queries.usuarios,
      (err, usuarios) => {

        if (err)
          return res.status(500).json(err);

        db.query(
          queries.agendamentos,
          (err, agendamentos) => {

            if (err)
              return res.status(500).json(err);

            db.query(
              queries.servicos,
              (err, servicos) => {

                if (err)
                  return res.status(500).json(err);

                db.query(
                  queries.profissionais,
                  (err, profissionais) => {

                    if (err)
                      return res.status(500).json(err);

                    db.query(
                      queries.faturamento,
                      (err, faturamento) => {

                        if (err)
                          return res.status(500).json(err);

                        res.json({

                          usuarios:
                            usuarios[0].total,

                          agendamentos:
                            agendamentos[0].total,

                          servicos:
                            servicos[0].total,

                          profissionais:
                            profissionais[0].total,

                          faturamento:
                            faturamento[0].total
                        });

                      }
                    );

                  }
                );

              }
            );

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json(error);
  }

});

module.exports = router;