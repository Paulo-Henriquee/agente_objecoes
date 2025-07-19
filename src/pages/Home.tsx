import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const regras = [
    "Mantenha seus dados de acesso em sigilo.",
    "Evite compartilhar seu login com outras pessoas.",
    "Sempre finalize a sessão após o uso.",
    "Respeite os níveis de permissão definidos no sistema.",
    "Revise as informações antes de confirmar qualquer operação.",
    "Mantenha os dados dos clientes atualizados.",
    "Utilize senhas fortes e troque-as periodicamente.",
    "Não altere configurações sem autorização.",
    "Reportar qualquer falha ou bug imediatamente.",
    "Evite uso do sistema em redes públicas não confiáveis.",
    "Utilize navegadores atualizados.",
    "Evite abrir anexos suspeitos durante o uso.",
    "Nunca compartilhe prints com dados sensíveis.",
    "Acompanhe atualizações de funcionalidades.",
    "Use o suporte apenas por canais oficiais."
  ];

  const handleIniciar = () => {
    navigate("/chat");
  };

  // Divide as regras em 3 blocos de 5
  const blocos = [regras.slice(0, 5), regras.slice(5, 10), regras.slice(10, 15)];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-6xl w-full text-white">
        <h1 className="text-3xl font-bold mb-2">Início</h1>
        <p className="mb-8">
          Seja bem-vindo ao sistema HealthScore,{" "}
          <span className="font-semibold">{user?.username}</span>!
        </p>

        <div className="flex flex-col gap-8">
          <h2 className="text-xl font-semibold text-white">📋 Regras de Uso do Sistema</h2>

          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {blocos.map((bloco, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full lg:w-1/3 space-y-2"
              >
                {bloco.map((regra, index) => (
                  <div key={index} className="flex items-start text-white">
                    <span className="mr-2 text-blue-300">→</span>
                    <span>{regra}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleIniciar}
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