import axios from "axios";

const scoreApi = axios.create({
  baseURL: "https://scoreapi.healthsafetytech.com",  // ✅ HTTPS garantido
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
