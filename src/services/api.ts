import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://authapi.healthsafetytech.com";

const authApi = axios.create({ baseURL });

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getUsuarioPorId = async (id: number, token: string) => {
  const res = await fetch(`${baseURL}/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
};

export default authApi;