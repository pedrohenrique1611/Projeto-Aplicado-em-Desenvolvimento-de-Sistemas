import { useEffect, useState } from "react";
import api from "../services/api";

function Profissionais() {

  const [profissionais, setProfissionais] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    telefone: "",
    status: "ativo",
  });

  useEffect(() => {

    buscarProfissionais();

  }, []);

  async function buscarProfissionais() {

    try {

      const response = await api.get("/profissionais");

      setProfissionais(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  async function salvarProfissional(e) {

    e.preventDefault();

    try {

      if (editandoId) {

        await api.put(
          `/profissionais/${editandoId}`,
          form
        );

        alert("Profissional atualizado!");

        setEditandoId(null);

      } else {

        await api.post("/profissionais", form);

        alert("Profissional criado!");
      }

      setForm({
        nome: "",
        especialidade: "",
        telefone: "",
        status: "ativo",
      });

      buscarProfissionais();

    } catch (error) {

      console.log(error);

      alert("Erro ao salvar");
    }
  }

  async function excluirProfissional(id) {

    const confirmar = window.confirm(
      "Deseja excluir este profissional?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/profissionais/${id}`);

      alert("Profissional removido!");

      buscarProfissionais();

    } catch (error) {

      console.log(error);
    }
  }

  function editarProfissional(profissional) {

    setEditandoId(profissional.id_profissional);

    setForm({
      nome: profissional.nome,
      especialidade: profissional.especialidade,
      telefone: profissional.telefone,
      status: profissional.status,
    });

    window.scrollTo(0, 0);
  }

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Profissionais 
      </h1>

      <div className="card shadow p-4 mb-5">

        <form onSubmit={salvarProfissional}>

          <div className="row g-3">

            <div className="col-md-3">

              <label className="form-label">
                Nome
              </label>

              <input
                type="text"
                className="form-control"
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Especialidade
              </label>

              <input
                type="text"
                className="form-control"
                value={form.especialidade}
                onChange={(e) =>
                  setForm({
                    ...form,
                    especialidade: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <label className="form-label">
                Telefone
              </label>

              <input
                type="text"
                className="form-control"
                value={form.telefone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    telefone: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-3">

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

                <option value="ativo">
                  Ativo
                </option>

                <option value="inativo">
                  Inativo
                </option>

              </select>

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark mt-4"
          >

            {editandoId
              ? "Atualizar Profissional"
              : "Criar Profissional"}

          </button>

        </form>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Lista de Profissionais
        </h3>

        <div className="table-responsive">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>
                <th>Nome</th>
                <th>Especialidade</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {profissionais.map((profissional) => (

                <tr key={profissional.id_profissional}>

                  <td>{profissional.nome}</td>

                  <td>{profissional.especialidade}</td>

                  <td>{profissional.telefone}</td>

                  <td>{profissional.status}</td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        editarProfissional(
                          profissional
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        excluirProfissional(
                          profissional.id_profissional
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

export default Profissionais;