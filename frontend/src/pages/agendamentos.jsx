import { useEffect, useState } from "react";
import api from "../services/api";

function Agendamentos() {

  const [agendamentos, setAgendamentos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    usuario_id: "",
    profissional_id: "",
    servico_id: "",
    data: "",
    horario: "",
    status: "Pendente",
  });

  useEffect(() => {

    buscarAgendamentos();
    buscarUsuarios();
    buscarProfissionais();
    buscarServicos();

  }, []);

  async function buscarAgendamentos() {

    const response = await api.get("/agendamentos");

    setAgendamentos(response.data);
  }

  async function buscarUsuarios() {

    const response = await api.get("/usuarios");

    setUsuarios(response.data);
  }

  async function buscarProfissionais() {

    const response = await api.get("/profissionais");

    setProfissionais(response.data);
  }

  async function buscarServicos() {

    const response = await api.get("/servicos");

    setServicos(response.data);
  }

  async function salvarAgendamento(e) {

    e.preventDefault();

    try {

      if (editandoId) {

        await api.put(
          `/agendamentos/${editandoId}`,
          {
            data: form.data,
            horario: form.horario,
            status: form.status,
          }
        );

        alert("Agendamento atualizado!");

        setEditandoId(null);

      } else {

        await api.post("/agendamentos", form);

        alert("Agendamento criado!");
      }

      setForm({
        usuario_id: "",
        profissional_id: "",
        servico_id: "",
        data: "",
        horario: "",
        status: "Pendente",
      });

      buscarAgendamentos();

    } catch (error) {

      console.log(error);

      alert("Erro ao salvar");
    }
  }

  async function excluirAgendamento(id) {

    const confirmar = window.confirm(
      "Deseja excluir este agendamento?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/agendamentos/${id}`);

      alert("Agendamento removido!");

      buscarAgendamentos();

    } catch (error) {

      console.log(error);

      alert("Erro ao excluir");
    }
  }

  function editarAgendamento(agendamento) {

    setEditandoId(agendamento.id_agendamento);

    setForm({
      usuario_id: agendamento.usuario_id,
      profissional_id: agendamento.profissional_id,
      servico_id: agendamento.servico_id,
      data: agendamento.data,
      horario: agendamento.horario,
      status: agendamento.status,
    });

    window.scrollTo(0, 0);
  }

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Agendamentos 
      </h1>

      <div className="card shadow p-4 mb-5">

        <form onSubmit={salvarAgendamento}>

          <div className="row g-3">

            <div className="col-md-4">

              <label className="form-label">
                Cliente
              </label>

              <select
                className="form-select"
                value={form.usuario_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    usuario_id: e.target.value,
                  })
                }
                disabled={editandoId}
              >

                <option value="">
                  Selecione
                </option>

                {usuarios.map((usuario) => (

                  <option
                    key={usuario.id_usuario}
                    value={usuario.id_usuario}
                  >
                    {usuario.nome}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Profissional
              </label>

              <select
                className="form-select"
                value={form.profissional_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    profissional_id: e.target.value,
                  })
                }
                disabled={editandoId}
              >

                <option value="">
                  Selecione
                </option>

                {profissionais.map((profissional) => (

                  <option
                    key={profissional.id_profissional}
                    value={profissional.id_profissional}
                  >
                    {profissional.nome}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Serviço
              </label>

              <select
                className="form-select"
                value={form.servico_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    servico_id: e.target.value,
                  })
                }
                disabled={editandoId}
              >

                <option value="">
                  Selecione
                </option>

                {servicos.map((servico) => (

                  <option
                    key={servico.id_servico}
                    value={servico.id_servico}
                  >
                    {servico.nome_servico}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Data
              </label>

              <input
                type="date"
                className="form-control"
                value={form.data}
                onChange={(e) =>
                  setForm({
                    ...form,
                    data: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Horário
              </label>

              <input
                type="time"
                className="form-control"
                value={form.horario}
                onChange={(e) =>
                  setForm({
                    ...form,
                    horario: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >

                <option value="Pendente">
                  Pendente
                </option>

                <option value="Confirmado">
                  Confirmado
                </option>

                <option value="Cancelado">
                  Cancelado
                </option>

              </select>

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark mt-4"
          >

            {editandoId
              ? "Atualizar Agendamento"
              : "Criar Agendamento"}

          </button>

        </form>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Lista de Agendamentos
        </h3>

        <div className="table-responsive">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>
                <th>Cliente</th>
                <th>Profissional</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {agendamentos.map((agendamento) => (

                <tr key={agendamento.id_agendamento}>

                  <td>{agendamento.usuario}</td>

                  <td>{agendamento.profissional}</td>

                  <td>{agendamento.nome_servico}</td>

                  <td>{agendamento.data}</td>

                  <td>{agendamento.horario}</td>

                  <td>{agendamento.status}</td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        editarAgendamento(agendamento)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        excluirAgendamento(
                          agendamento.id_agendamento
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

export default Agendamentos;