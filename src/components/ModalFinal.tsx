import React from "react";
import { useNavigate } from "react-router-dom";

const ModalFinal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Camada escura + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal final */}
      <div className="relative z-10 bg-white/30 backdrop-blur-md rounded-xl px-6 py-6 w-full max-w-md mx-4 text-white shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2 animate-blinkBlue">
          Teste Finalizado!
        </h2>
        <p className="text-sm mb-6">
          Parabéns! Você completou o treinamento de objeções.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/inicio")}
            className="w-1/2 border border-blue-400 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate("/rank")}
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Ver Rank
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFinal;
