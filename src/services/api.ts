import axios from "axios";

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

// Busca o usuário pelo ID usando a instância do axios
export const getUsuarioPorId = async (id: number): Promise<{ username: string }> => {
  const response = await authApi.get(`/users/${id}`);
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
