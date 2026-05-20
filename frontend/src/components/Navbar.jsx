import { Link } from "react-router-dom";

function Navbar() {

  function logout() {

    localStorage.removeItem("token");

    window.location.href = "/";
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >
          Barbearia BSB
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/agendamentos"
              >
                Agendamentos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/servicos"
              >
                Serviços
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/profissionais"
              >
                Profissionais
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/pagamentos"
              >
                Pagamentos
              </Link>
            </li>

          </ul>

          <button
            onClick={logout}
            className="btn btn-danger"
          >
            Sair
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;