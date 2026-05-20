import { useEffect, useState } from "react";
import api from "../services/api";

function Pagamentos() {

  const [pagamentos, setPagamentos] = useState([]);

  const [agendamentos, setAgendamentos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    agendamento_id: "",
    valor: "",
    metodo_pagamento: "Pix",
    status_pagamento: "Pendente",
  });

  useEffect(() => {

    buscarPagamentos();

    buscarAgendamentos();

  }, []);

  async function buscarPagamentos() {

    try {

      const response = await api.get("/pagamentos");

      setPagamentos(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarAgendamentos() {

    try {

      const response = await api.get("/agendamentos");

      setAgendamentos(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  async function salvarPagamento(e) {

    e.preventDefault();

    try {

      if (editandoId) {

        await api.put(
          `/pagamentos/${editandoId}`,
          form
        );

        alert("Pagamento atualizado!");

        setEditandoId(null);

      } else {

        await api.post("/pagamentos", form);

        alert("Pagamento cadastrado!");
      }

      setForm({
        agendamento_id: "",
        valor: "",
        metodo_pagamento: "Pix",
        status_pagamento: "Pendente",
      });

      buscarPagamentos();

    } catch (error) {

      console.log(error);

      alert("Erro ao salvar pagamento");
    }
  }

  async function excluirPagamento(id) {

    const confirmar = window.confirm(
      "Deseja excluir este pagamento?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/pagamentos/${id}`);

      alert("Pagamento removido!");

      buscarPagamentos();

    } catch (error) {

      console.log(error);
    }
  }

  function editarPagamento(pagamento) {

    setEditandoId(pagamento.id_pagamento);

    setForm({
      agendamento_id: pagamento.agendamento_id,
      valor: pagamento.valor,
      metodo_pagamento:
        pagamento.metodo_pagamento,
      status_pagamento:
        pagamento.status_pagamento,
    });

    window.scrollTo(0, 0);
  }

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Pagamentos 
      </h1>

      <div className="card shadow p-4 mb-5">

        <form onSubmit={salvarPagamento}>

          <div className="row g-3">

            <div className="col-md-3">

              <label className="form-label">
                Agendamento
              </label>

              <select
                className="form-select"
                value={form.agendamento_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    agendamento_id: e.target.value,
                  })
                }
                disabled={editandoId}
              >

                <option value="">
                  Selecione
                </option>

                {agendamentos.map((agendamento) => (

                  <option
                    key={agendamento.id_agendamento}
                    value={agendamento.id_agendamento}
                  >
                    {agendamento.usuario}
                    {" - "}
                    {agendamento.nome_servico}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Valor
              </label>

              <input
                type="number"
                className="form-control"
                value={form.valor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    valor: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Método
              </label>

              <select
                className="form-select"
                value={form.metodo_pagamento}
                onChange={(e) =>
                  setForm({
                    ...form,
                    metodo_pagamento:
                      e.target.value,
                  })
                }
              >

                <option value="Pix">
                  Pix
                </option>

                <option value="Cartão">
                  Cartão
                </option>

                <option value="Dinheiro">
                  Dinheiro
                </option>

              </select>

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={form.status_pagamento}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status_pagamento:
                      e.target.value,
                  })
                }
              >

                <option value="Pendente">
                  Pendente
                </option>

                <option value="Pago">
                  Pago
                </option>

              </select>

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark mt-4"
          >

            {editandoId
              ? "Atualizar Pagamento"
              : "Cadastrar Pagamento"}

          </button>

        </form>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Lista de Pagamentos
        </h3>

        <div className="table-responsive">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {pagamentos.map((pagamento) => (

                <tr key={pagamento.id_pagamento}>

                  <td>{pagamento.usuario}</td>

                  <td>{pagamento.nome_servico}</td>

                  <td>
                    R$ {pagamento.valor}
                  </td>

                  <td>
                    {pagamento.metodo_pagamento}
                  </td>

                  <td>
                    {pagamento.status_pagamento}
                  </td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        editarPagamento(
                          pagamento
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        excluirPagamento(
                          pagamento.id_pagamento
                        )
                      }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Pagamentos;