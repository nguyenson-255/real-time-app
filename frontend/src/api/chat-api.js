import axios from "axios";

const chatApi = axios.create({
    baseURL: `http://${process.env.BASE_URL_CHAT_API ?? 'localhost'}:3002`,
    headers: {
      "Content-Type": "application/json",
    },
});

// Add a request interceptor
chatApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

chatApi.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    // let navigate = useNavigate();
    
    // const originalRequest = error.config

    if (
      error.response.status === 401) {
      // navigate('/login');
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default chatApi;
