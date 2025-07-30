import React, { createContext, useContext, useEffect, useState } from "react";
import { getRanking } from "../services/scoreapi";
import { getUsuarioPorId, getAuthToken } from "../services/api";

interface Vendedor {
  id_usuario: number;
  username: string;
  pontuacao_acumulada: number;
}

interface RankingContextType {
  ranking: Vendedor[];
  loading: boolean;
  fetchRanking: () => Promise<void>; // ✅ novo
}

const RankingContext = createContext<RankingContextType>({
  ranking: [],
  loading: true,
  fetchRanking: async () => {}, // fallback vazio
});

export const RankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ranking, setRanking] = useState<Vendedor[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ função reutilizável
  const fetchRanking = async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    try {
      const result = await getRanking(token);

      const rankingComNomes: Vendedor[] = await Promise.all(
        result.map(async (item: any) => {
          try {
            const user = await getUsuarioPorId(item.id_usuario);
            return {
              id_usuario: item.id_usuario,
              username: user.username,
              pontuacao_acumulada: item.pontuacao_acumulada,
            };
          } catch {
            return {
              id_usuario: item.id_usuario,
              username: "Desconhecido",
              pontuacao_acumulada: item.pontuacao_acumulada,
            };
          }
        })
      );

      rankingComNomes.sort((a, b) => b.pontuacao_acumulada - a.pontuacao_acumulada);
      setRanking(rankingComNomes);
    } catch (err) {
      console.error("Erro ao carregar ranking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking(); // ✅ carregamento inicial
  }, []);

  return (
    <RankingContext.Provider value={{ ranking, loading, fetchRanking }}>
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = () => useContext(RankingContext);
