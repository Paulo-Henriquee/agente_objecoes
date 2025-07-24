import React from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";
import logo from "../assets/HS2.ico";

interface DificuldadeModalProps {
  onStart: (nivel: string) => void;
}

const niveis = ["Fácil", "Médio", "Difícil", "Profissional"];

const DificuldadeModal: React.FC<DificuldadeModalProps> = ({ onStart }) => {
  const [nivelSelecionado, setNivelSelecionado] = React.useState("Fácil");
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      {/* Camada escura + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal central */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl px-6 py-6 w-full max-w-md mx-4 text-white shadow-lg flex flex-col items-center">
        {/* Logo centralizada acima do título */}
        <img
          src={logo}
          alt="Logo Health Safety"
          className="w-10 h-10 sm:w-12 sm:h-12 mb-2"
        />

        <h2 className="text-2xl font-bold mb-2 text-blue-300 text-center">
          Treinamento de Objeções
        </h2>

        <p className="mb-4 text-sm text-white text-center">
          Defina a dificuldade desejada e inicie seu teste.
        </p>

        <div className="flex flex-col gap-2 mb-6 w-full">
          <span className="text-sm font-semibold text-blue-200 text-center">
            Dificuldade:
          </span>
          {niveis.map((nivel) => (
            <label
              key={nivel}
              className={`border rounded-lg px-4 py-2 cursor-pointer transition text-center ${
                nivelSelecionado === nivel
                  ? "bg-blue-600 border-blue-400 text-white font-bold"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <input
                type="radio"
                name="dificuldade"
                value={nivel}
                className="hidden"
                checked={nivelSelecionado === nivel}
                onChange={() => setNivelSelecionado(nivel)}
              />
              {nivel}
            </label>
          ))}
        </div>

        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={() => navigate("/")}
            className="w-1/2 border border-blue-400 text-blue-200 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Voltar
          </button>
          <button
            onClick={() => onStart(nivelSelecionado)}
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DificuldadeModal;
