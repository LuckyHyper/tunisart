import axios from 'axios';
import jwtDecode from 'jwt-decode';

const baseURL = process.env.REACT_APP_API_URL;

let authToken = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authToken ? authToken : ''}` },
});

axiosInstance.defaults.withCredentials = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    authToken = localStorage.getItem('token');
    if (!authToken) return config;

    config.headers.Authorization = `Bearer ${authToken ? authToken : ''}`;

    const user = jwtDecode(authToken);
    const isExpired = user.exp < (new Date().getTime() + 1) / 1000;
    if (!isExpired) return config;

    await axios
      .get(`/api/auth/refresh`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.accessToken);
          config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        }
      })
      .catch((err) => {
        return config;
      });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/*
axios.interceptors.response.use(
  (resp) => resp,
  async (err) => {
    if (err.status === 401) {
      console.log('sending refresh token!');
      const refreshResult = await axiosInstance.get('/api/auth/refresh');
      if (refreshResult.status === 200) {
        const retryRequest = new Promise((resolve) => {
          setTimeout(() => {
            console.log('retry the request', err.config.url);
            resolve();
          }, err.config.retryDelay || 1000);
        });
        return retryRequest.then(() => axios(err.config));
      } else return err;
    }

    return err;
  }
);
*/
export default axiosInstance;
