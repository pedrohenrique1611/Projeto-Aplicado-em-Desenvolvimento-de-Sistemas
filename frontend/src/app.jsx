import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Pagamentos from "./pages/Pagamentos";
import Servicos from "./pages/Servicos";
import Profissionais from "./pages/Profissionais";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/agendamentos"
          element={<Agendamentos />}
        />

        <Route
          path="/pagamentos"
          element={<Pagamentos />}
        />

        <Route
          path="/servicos"
          element={<Servicos />}
        />

        <Route
          path="/profissionais"
          element={<Profissionais />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;