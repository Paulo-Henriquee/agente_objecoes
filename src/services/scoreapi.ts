// services/scoreapi.ts
const SCORE_BASE_URL = "https://scoreapi.healthsafetytech.com";

export const getRanking = async (token: string) => {
  const res = await fetch(`${SCORE_BASE_URL}/ranking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar ranking");
  return res.json();
};