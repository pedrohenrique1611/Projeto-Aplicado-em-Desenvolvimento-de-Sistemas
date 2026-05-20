import { useEffect, useState } from "react";
import api from "../services/api";

function Servicos() {

  const [servicos, setServicos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome_servico: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {

    buscarServicos();

  }, []);

  async function buscarServicos() {

    try {

      const response = await api.get("/servicos");

      setServicos(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  async function salvarServico(e) {

    e.preventDefault();

    try {

      if (editandoId) {

        await api.put(
          `/servicos/${editandoId}`,
          form
        );

        alert("Serviço atualizado!");

        setEditandoId(null);

      } else {

        await api.post("/servicos", form);

        alert("Serviço criado!");
      }

      setForm({
        nome_servico: "",
        descricao: "",
        preco: "",
      });

      buscarServicos();

    } catch (error) {

      console.log(error);

      alert("Erro ao salvar");
    }
  }

  async function excluirServico(id) {

    const confirmar = window.confirm(
      "Deseja excluir este serviço?"
    );

    if (!confirmar) return;

    try {

      await api.delete(`/servicos/${id}`);

      alert("Serviço removido!");

      buscarServicos();

    } catch (error) {

      console.log(error);
    }
  }

  function editarServico(servico) {

    setEditandoId(servico.id_servico);

    setForm({
      nome_servico: servico.nome_servico,
      descricao: servico.descricao,
      preco: servico.preco,
    });

    window.scrollTo(0, 0);
  }

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Serviços 
      </h1>

      <div className="card shadow p-4 mb-5">

        <form onSubmit={salvarServico}>

          <div className="row g-3">

            <div className="col-md-4">

              <label className="form-label">
                Nome do Serviço
              </label>

              <input
                type="text"
                className="form-control"
                value={form.nome_servico}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome_servico: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Descrição
              </label>

              <input
                type="text"
                className="form-control"
                value={form.descricao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descricao: e.target.value,
                  })
                }
              />

            </div>

            <div className="col-md-4">

              <label className="form-label">
                Preço
              </label>

              <input
                type="number"
                className="form-control"
                value={form.preco}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preco: e.target.value,
                  })
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark mt-4"
          >

            {editandoId
              ? "Atualizar Serviço"
              : "Criar Serviço"}

          </button>

        </form>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Lista de Serviços
        </h3>

        <div className="table-responsive">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>

            </thead>

            <tbody>

              {servicos.map((servico) => (

                <tr key={servico.id_servico}>

                  <td>{servico.nome_servico}</td>

                  <td>{servico.descricao}</td>

                  <td>
                    R$ {servico.preco}
                  </td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        editarServico(servico)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        excluirServico(
                          servico.id_servico
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

export default Servicos;