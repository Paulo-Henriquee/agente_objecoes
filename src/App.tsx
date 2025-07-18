import React from "react";
import { useLocation } from "react-router-dom";
import "./styles/index.css";
import AppRoutes from "./router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Rotas onde não deve ter layout (Header/Sidebar)
const noLayoutRoutes = ["/login", "/chat"];

const App: React.FC = () => {
  const location = useLocation();

  // Aceita rota exata ou subrotas como /chat/nivel
  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="h-screen flex flex-col">
      {!hideLayout && <Header />}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {!hideLayout && <Sidebar />}
        <main className="flex-1 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
