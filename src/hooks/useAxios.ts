import axios from "axios";
const useAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

useAxios.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const accessToken =
      userInfo && userInfo.tokens ? userInfo.tokens.accessToken : "";

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

useAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default useAxios;
