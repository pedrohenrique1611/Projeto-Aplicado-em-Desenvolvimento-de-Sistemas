import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  async function fazerLogin(e) {

    e.preventDefault();

    try {

      const response = await api.post(
        "/usuarios/login",
        form
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login realizado!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Email ou senha inválidos");
    }
  }

  return (

    <div className="container">

      <div className="row justify-content-center align-items-center vh-100">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Login 
            </h2>

            <form onSubmit={fazerLogin}>

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
                Entrar
              </button>

            </form>

            <p className="text-center mt-3">

              Não possui conta?

              <Link to="/cadastro">
                {" "}Cadastre-se
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;