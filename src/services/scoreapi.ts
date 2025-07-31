import axios from "axios";

const scoreApi = axios.create({
  baseURL: "https://scoreapi.healthsafetytech.com",
});

scoreApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRanking = async (token: string) => {
  const response = await scoreApi.get("/ranking", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const iniciarSimulacao = async (
  token: string,
  id_usuario: string,
  dificuldade: string
) => {
  try {
    const response = await axios.post(
      "https://scoreapi.healthsafetytech.com/simulacoes",
      {
        id_usuario,
        dificuldade,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // Apenas relança o erro para ser tratado no componente
    throw error;
  }
};

// ✅ Buscar todas as regras do sistema
export const getRegras = async (token: string) => {
  const response = await scoreApi.get("/regras", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ✅ Atualizar o conteúdo de uma regra específica
export const updateRegra = async (
  token: string,
  id: number,
  conteudo: string
) => {
  const response = await scoreApi.patch(
    `/regras/${id}`,
    { conteudo },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const atualizarRanking = async (
  token: string,
  id_usuario: number,
  nova_pontuacao: number
) => {
  const response = await scoreApi.post(
    `/ranking/atualizar?id_usuario=${id_usuario}&nova_pontuacao=${nova_pontuacao}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};