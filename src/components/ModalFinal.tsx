// src/components/ModalFinal.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ModalFinal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-center shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-800">
          Teste Finalizado!
        </h2>
        <p className="text-gray-700 mb-6">
          Parabéns! Você completou o treinamento de objeções.
        </p>
        <button
          onClick={() => navigate("/vendas")}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
        >
          VER RANK
        </button>
      </div>
    </div>
  );
};

export default ModalFinal;
