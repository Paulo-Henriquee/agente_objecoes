import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";
import { useConfiguracoes } from "../context/ConfiguracoesContext";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { regras } = useConfiguracoes();

  const blocos = [regras.slice(0, 5), regras.slice(5, 10), regras.slice(10, 15)];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-2">Início</h1>
        <p className="mb-6">
          Seja bem-vindo ao sistema HealthScore,{" "}
          <span className="font-semibold">{user?.username}</span>!
        </p>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Regras de Uso do Sistema</h2>

          <div className="flex flex-col lg:flex-row gap-4">
            {blocos.map((bloco, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full lg:w-1/3 space-y-2"
              >
                {bloco.map((regra, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-2 text-blue-300">→</span>
                    <span>{regra}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/chat")}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              INICIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
