import React from "react";

const rankings = [
  { pos: "1°", nome: "VENDEDOR1", score: 98 },
  { pos: "2°", nome: "VENDEDOR2", score: 94 },
  { pos: "3°", nome: "VENDEDOR3", score: 91 },
  { pos: "4°", nome: "VENDEDOR4", score: 87 },
  { pos: "5°", nome: "VENDEDOR5", score: 85 },
  { pos: "6°", nome: "VENDEDOR6", score: 83 },
  { pos: "7°", nome: "VENDEDOR7", score: 81 },
  { pos: "8°", nome: "VENDEDOR8", score: 79 },
  { pos: "9°", nome: "VENDEDOR9", score: 77 },
  { pos: "10°", nome: "VENDEDOR10", score: 75 },
];

const getColorByPosition = (index: number) => {
  if (index === 0) return "bg-cyan-300 text-cyan-900 font-bold";      // Diamante
  if (index === 1) return "bg-yellow-400 text-yellow-900 font-bold";  // Ouro (mais viva)
  if (index === 2) return "bg-gray-300 text-gray-900 font-bold";      // Prata
  return "bg-amber-200 text-amber-900";                               // Bronze (mais apagado)
};

const Rank: React.FC = () => {
  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url('/src/assets/fundo.png')` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          RANK TREINAMENTO DE OBJEÇÕES - HEALTH SAFETY
        </h1>

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
              {rankings.map((vendedor, index) => (
                <tr
                  key={index}
                  className={`rounded-xl ${getColorByPosition(index)} text-sm md:text-base text-center`}
                >
                  <td className="px-4 py-2 rounded-l-xl">{vendedor.pos}</td>
                  <td className="px-4 py-2">{vendedor.nome}</td>
                  <td className="px-4 py-2 rounded-r-xl">{vendedor.score}</td>
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
