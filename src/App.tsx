import React, { useEffect } from "react"; // adiciona useEffect aqui
import { useLocation, useNavigate } from "react-router-dom"; // adiciona useNavigate
import "./styles/index.css";
import AppRoutes from "./router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CentralButton from "./components/CentralButton";
import fundo from "./assets/fundo.png";

const noLayoutRoutes = ["/login", "/chat"];


const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // para redirecionar sem reload
  const noLayoutRoutes = ["/login", "/chat"];
  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  // 🔒 Verifica se há token, senão redireciona pro login
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // se não tiver token e não estiver numa rota liberada, redireciona
    if (!token && !noLayoutRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname]); // roda sempre que a rota mudar

  return (
    <>
      <div className="h-screen flex flex-col">
        {!hideLayout && <Header />}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {!hideLayout && <Sidebar />}

          <main
            className="flex-1 overflow-hidden relative bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${fundo})`,
            }}
          >
            <div className="relative z-10 h-full w-full flex flex-col">
              <AppRoutes />
            </div>
          </main>
        </div>
      </div>

      {/* Botão Flutuante Central HS */}
      {!hideLayout && <CentralButton />}
    </>
  );
};

export default App;