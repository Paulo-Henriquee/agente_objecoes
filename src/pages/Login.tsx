import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import fundo from "../assets/fundo.png";

const Login: React.FC = () => {
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && location.pathname !== "/inicio") {
      navigate("/inicio", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  /** Agora com padding horizontal para evitar conteúdo “cortado” */
  const baseInputClasses =
    "flex-1 px-3 bg-transparent no-autofill-bg text-white placeholder:text-white/60 focus:outline-none";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl px-6 py-6 w-full max-w-md mx-4 text-white shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="max-h-[80px] object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-blue-300 text-center">
          Bem-vindo de volta!
        </h2>
        <p className="mb-4 text-sm text-white text-center">
          Faça login para acessar o sistema.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-blue-500">
            <img
              src="https://img.icons8.com/?size=100&id=98957&format=png&color=000000"
              alt="User Icon"
              className="w-5 h-5 mr-3 filter invert"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="Usuário"
              autoComplete="username"
              required
              className={baseInputClasses}
            />
          </div>

          <div className="flex items-center px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-blue-500">
            <img
              src="https://img.icons8.com/?size=100&id=64776&format=png&color=000000"
              alt="Password Icon"
              className="w-5 h-5 mr-3 filter invert"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Senha"
              autoComplete="current-password"
              required
              className={baseInputClasses}
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 text-center bg-red-900/20 p-3 rounded-lg border border-red-400/40">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg mt-2 disabled:bg-blue-600/50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
