import React from "react";
import fundo from "../assets/fundo.png";
import logo from "../assets/HS2.ico";
import { useRanking } from "../context/RankingContext";

const getColorByPosition = (index: number) => {
  if (index === 0) return "bg-cyan-500 text-cyan-900 font-bold";
  if (index === 1) return "bg-yellow-400 text-yellow-900 font-bold";
  if (index === 2) return "bg-gray-400 text-gray-900 font-bold";
  return "bg-yellow-700 text-yellow-100";
};

const Rank: React.FC = () => {
  const { ranking, loading } = useRanking();

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Carregando ranking...
      </div>
    );
  }

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 w-full max-w-4xl mx-auto">
        {/* Logo acima do título */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logo}
            alt="Logo Health Safety"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-1"
          />
          <h1 className="text-2xl md:text-3xl font-bold">
            RANK TREINAMENTO DE OBJEÇÕES - HEALTH SAFETY
          </h1>
        </div>

        {/* Tabela */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm md:text-base text-gray-300 text-center">
                <th className="px-4 py-2">Posição</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((vendedor, index) => (
                <tr
                  key={vendedor.id_usuario}
                  className={`rounded-xl ${getColorByPosition(index)} text-sm md:text-base text-center`}
                >
                  <td className="px-4 py-2 rounded-l-xl">{index + 1}°</td>
                  <td className="px-4 py-2">{vendedor.username}</td>
                  <td className="px-4 py-2 rounded-r-xl">{vendedor.pontuacao_acumulada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rank;
