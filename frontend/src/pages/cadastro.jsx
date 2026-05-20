import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Cadastro() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  async function cadastrar(e) {

    e.preventDefault();

    try {

      await api.post(
        "/usuarios/register",
        form
      );

      alert("Usuário cadastrado!");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Erro ao cadastrar");
    }
  }

  return (

    <div className="container">

      <div className="row justify-content-center align-items-center vh-100">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Cadastro 
            </h2>

            <form onSubmit={cadastrar}>

              <div className="mb-3">

                <label className="form-label">
                  Nome
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite seu nome"
                  value={form.nome}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nome: e.target.value,
                    })
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Digite seu email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={form.senha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      senha: e.target.value,
                    })
                  }
                />

              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Cadastrar
              </button>

            </form>

            <p className="text-center mt-3">

              Já possui conta?

              <Link to="/">
                {" "}Fazer Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cadastro;