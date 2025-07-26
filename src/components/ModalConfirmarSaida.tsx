import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/HS2.ico";

interface ModalConfirmarSaidaProps {
  onCancel: () => void;
}

const ModalConfirmarSaida: React.FC<ModalConfirmarSaidaProps> = ({ onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fundo escuro com blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 bg-white/30 backdrop-blur-md rounded-xl px-6 py-6 w-full max-w-md mx-4 text-white shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo Health Safety"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-red-500 animate-pulse">
          Tem certeza que quer sair?
        </h2>
        <p className="text-sm mb-6">
          Você perderá todo o teste e terá que começar novamente!
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/inicio")}
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Sim, quero sair
          </button>
          <button
            onClick={onCancel}
            className="w-1/2 border border-blue-400 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Voltar para o teste
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarSaida;
