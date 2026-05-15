import api from "./api";

const register = (username, email, password, roles) => {
  return api.post("/auth/signup", { username, email, password, roles });
};

const login = (username, password) => {
  return api.post("/auth/signin", { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response.data;
    });
};

const logout = (userId) => {
  return api.post("/auth/signout", { userId }).then(() => {
    localStorage.clear();
  });
};

export default { register, login, logout };