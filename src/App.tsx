import React from "react";
import { useLocation } from "react-router-dom";
import "./styles/index.css";
import AppRoutes from "./router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import fundo from "./assets/fundo.png"; // adicione isso

const noLayoutRoutes = ["/login", "/chat"];

const App: React.FC = () => {
  const location = useLocation();

  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="h-screen flex flex-col">
      {!hideLayout && <Header />}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {!hideLayout && <Sidebar />}

        {/* Aqui o fundo é aplicado ao main inteiro */}
        <main
          className="flex-1 overflow-auto relative bg-cover bg-center bg-no-repeat"
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
  );
};

export default App;
