import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useConfiguracoes } from "../context/ConfiguracoesContext";
import logo from "../assets/HS2.ico";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { regras } = useConfiguracoes();

  // Ordenar e dividir em 3 blocos
  const regrasOrdenadas = [...regras].sort((a, b) => a.ordem - b.ordem);
  const blocos = [
    regrasOrdenadas.slice(0, 5),
    regrasOrdenadas.slice(5, 10),
    regrasOrdenadas.slice(10, 15),
  ];

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-black/40 text-white rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={logo}
            alt="Logo Health Safety"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <h1 className="text-3xl font-bold">Início</h1>
        </div>

        <p className="mb-2 text-white text-lg">
          Seja bem-vindo ao sistema HealthScore,{" "}
          <span className="font-semibold">{user?.username}</span>!
        </p>

        <p className="mb-6 text-sm text-gray-200 leading-relaxed">
          O <strong>HealthScore</strong> é um sistema inteligente de simulação criado para <strong>treinar vendedores</strong> com base em objeções reais do mercado. Através de um <strong>ambiente gamificado</strong>, você será desafiado a responder de forma estratégica, empática e técnica às dúvidas e resistências comuns de clientes em negociações.
        </p>



        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Regras de Uso do Sistema</h2>

          <div className="flex flex-col lg:flex-row gap-4">
            {blocos.map((bloco, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full lg:w-1/3 space-y-2"
              >
                {bloco.map((regra) => (
                  <div key={regra.id} className="flex items-start">
                    <span className="mr-2 text-blue-300">→</span>
                    <span>{regra.conteudo}</span>
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
