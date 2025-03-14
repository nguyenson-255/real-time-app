import axios from "axios";

const api = axios.create({
    baseURL: `http://${process.env.BASE_URL ?? 'localhost'}:3001`,
    headers: {
      "Content-Type": "application/json",
    },
});

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default api;