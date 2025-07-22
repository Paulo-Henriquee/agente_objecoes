import React from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";

const ModalFinal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
      //style={{ backgroundImage: `url(${fundo})` }}
    >
      {/* Camada escura + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal final */}
      <div className="relative z-10 bg-white/30 backdrop-blur-md rounded-xl px-6 py-6 w-full max-w-md mx-4 text-white shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-500">
          Teste Finalizado!
        </h2>
        <p className="text-sm mb-6">
          Parabéns! Você completou o treinamento de objeções.
        </p>

        <button
          onClick={() => navigate("/rank")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          VER RANK
        </button>
      </div>
    </div>
  );
};

export default ModalFinal;
