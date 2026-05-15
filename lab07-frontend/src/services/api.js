import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Antes de enviar la petición, añadimos el token si existe
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // En producción se recomienda state, pero para el lab usaremos local para persistencia
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Al recibir la respuesta, si hay error 401, intentamos refrescar
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token expirado
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;