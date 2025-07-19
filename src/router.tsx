import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AgenteObjecoes from "./pages/AgenteObjecoes";
import NotFound from "./pages/NotFound";
import Configuracoes from "./pages/Configuracoes";
import Home from "./pages/Home";

import Servicos from "./pages/Servicos";
import Rank from "./pages/Rank";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-gray-500">Verificando permissões...</div>;

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-red-600 text-center font-semibold">
        Acesso negado. Esta página é restrita a administradores.
      </div>
    );
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route
      path="/inicio"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <AgenteObjecoes />
        </ProtectedRoute>
      }
    />

    <Route
      path="/servicos"
      element={
        <ProtectedRoute>
          <Servicos />
        </ProtectedRoute>
      }
    />

    <Route
      path="/rank"
      element={
        <ProtectedRoute>
          <Rank />
        </ProtectedRoute>
      }
    />

    <Route
      path="/configuracoes"
      element={
        <ProtectedRoute>
          <RequireAdmin>
            <Configuracoes />
          </RequireAdmin>
        </ProtectedRoute>
      }
    />

    <Route path="/" element={<Navigate to="/inicio" />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
