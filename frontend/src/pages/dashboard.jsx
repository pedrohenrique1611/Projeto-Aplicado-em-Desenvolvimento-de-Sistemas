import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [dados, setDados] = useState({

    usuarios: 0,
    agendamentos: 0,
    servicos: 0,
    profissionais: 0,
    faturamento: 0,
  });

  useEffect(() => {

    buscarDados();

  }, []);

  async function buscarDados() {

    try {

      const response = await api.get("/dashboard");

      setDados(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Dashboard 
      </h1>

      <div className="row g-4">

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                 Usuários
              </h5>

              <h1>
                {dados.usuarios}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                 Agendamentos
              </h5>

              <h1>
                {dados.agendamentos}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                 Serviços
              </h5>

              <h1>
                {dados.servicos}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                Profissionais
              </h5>

              <h1>
                {dados.profissionais}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body text-center">

              <h5>
                 Faturamento
              </h5>

              <h1>
                R$ {dados.faturamento}
              </h1>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;