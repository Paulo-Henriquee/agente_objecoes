import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Define a URL base da API de autenticação
const baseURL = import.meta.env.VITE_API_URL || "https://authapi.healthsafetytech.com";

// Instância do axios com baseURL
const authApi = axios.create({ baseURL });

// Interceptor para adicionar o token a todas as requisições
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

// Interceptor para lidar com erros de autenticação (ex: token expirado)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado → limpar localStorage e redirecionar
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      // Redirecionar para tela de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Busca o usuário pelo ID usando a instância do axios
export const getUsuarioPorId = async (id: number): Promise<{ username: string }> => {
  const response = await authApi.get(`/users/${id}`);
  return response.data;
};

// Busca o ID do usuário atual usando a instância do axios
export const getUsuarioAtual = async (token: string): Promise<{ id: string }> => {
  const response = await authApi.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Utilitário para obter token
export const getAuthToken = () => localStorage.getItem("access_token");

// (Opcional) Utilitários adicionais
export const getUserId = () => {
  const id = localStorage.getItem("user_id");
  return id ? parseInt(id) : null;
};

export const getUsername = () => localStorage.getItem("username");
export const getUserRole = () => localStorage.getItem("role");

export default authApi;