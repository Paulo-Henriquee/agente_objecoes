import React from "react";
import fundo from "../assets/fundo.png";

interface DificuldadeModalProps {
  onStart: (nivel: string) => void;
}

const niveis = ["Fácil", "Médio", "Difícil", "Profissional"];

const DificuldadeModal: React.FC<DificuldadeModalProps> = ({ onStart }) => {
  const [nivelSelecionado, setNivelSelecionado] = React.useState("Fácil");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      {/* camada escura por cima do fundo */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="bg-white p-6 rounded-xl w-full max-w-md text-center shadow-lg z-10">
        <h2 className="text-xl font-bold mb-2 text-blue-800">
          Treinamento de Objeções
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          Defina a dificuldade desejada e inicie seu teste.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          <span className="text-sm text-gray-600 font-semibold">
            Dificuldade:
          </span>
          {niveis.map((nivel) => (
            <label
              key={nivel}
              className={`border rounded-lg px-4 py-2 cursor-pointer transition ${
                nivelSelecionado === nivel
                  ? "bg-blue-100 border-blue-500 text-blue-700 font-bold"
                  : "bg-white border-gray-300 text-gray-800"
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

        <button
          onClick={() => onStart(nivelSelecionado)}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default DificuldadeModal;
