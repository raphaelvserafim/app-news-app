import environment from '@/configs/environment';
import axios from 'axios';
const api = axios.create({
  baseURL: `${environment.API.URL}/wp-json/wp/v2/`,
});

export default api;
