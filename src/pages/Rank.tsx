import React, { useEffect, useState } from "react";
import fundo from "../assets/fundo.png";
import { getRanking } from "../services/scoreapi";
import { getUsuarioPorId, getAuthToken } from "../services/api";

interface Vendedor {
  id_usuario: number;
  nome: string;
  pontuacao_acumulada: number;
}

const getColorByPosition = (index: number) => {
  if (index === 0) return "bg-cyan-500 text-cyan-900 font-bold";
  if (index === 1) return "bg-yellow-400 text-yellow-900 font-bold";
  if (index === 2) return "bg-gray-400 text-gray-900 font-bold";
  return "bg-yellow-700 text-yellow-100";
};

const Rank: React.FC = () => {
  const [ranking, setRanking] = useState<Vendedor[]>([]);

  useEffect(() => {
    (async () => {
      console.log("Rank useEffect iniciou.");

      const token = getAuthToken();
      if (!token) return;

      try {
        const result = await getRanking(token);

        const rankingComNomes: Vendedor[] = await Promise.all(
          result.map(async (item: any) => {
            try {
              const user = await getUsuarioPorId(item.id_usuario); // 🔄 token removido
              return {
                id_usuario: item.id_usuario,
                nome: user.username,
                pontuacao_acumulada: item.pontuacao_acumulada,
              };
            } catch (err) {
              console.warn(`Usuário ${item.id_usuario} não encontrado.`);
              return {
                id_usuario: item.id_usuario,
                nome: "Desconhecido",
                pontuacao_acumulada: item.pontuacao_acumulada,
              };
            }
          })
        );

        // Ordena por pontuação decrescente
        rankingComNomes.sort((a, b) => b.pontuacao_acumulada - a.pontuacao_acumulada);
        setRanking(rankingComNomes);
      } catch (err) {
        console.error("Erro ao buscar ranking:", err);
      }
    })();
  }, []);

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${fundo})` }}
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
              {ranking.map((vendedor, index) => (
                <tr
                  key={vendedor.id_usuario}
                  className={`rounded-xl ${getColorByPosition(index)} text-sm md:text-base text-center`}
                >
                  <td className="px-4 py-2 rounded-l-xl">{index + 1}°</td>
                  <td className="px-4 py-2">{vendedor.nome}</td>
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
