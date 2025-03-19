import axios from "axios";

const api = axios.create({
    baseURL: `http://${process.env.BASE_URL ?? 'localhost'}:3001`,
    headers: {
      "Content-Type": "application/json",
    },
});


export default api;
