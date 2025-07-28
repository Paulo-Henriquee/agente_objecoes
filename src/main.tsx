// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ConfiguracoesProvider } from "./context/ConfiguracoesContext";
import { RankingProvider } from "./context/RankingContext";
import { DuvidaProvider } from "./context/DuvidaContext";
import "./styles/index.css"; // Importa o Tailwind e estilos globais

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ConfiguracoesProvider>
          <RankingProvider>
            <DuvidaProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </DuvidaProvider>
          </RankingProvider>
      </ConfiguracoesProvider>
    </AuthProvider>
  </React.StrictMode>
);