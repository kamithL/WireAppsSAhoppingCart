import axios, {AxiosInstance} from 'axios';
import {BASE_URL, DEFAULT_API_TIMEOUT} from '../constants/app';

class AxiosConfig {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: DEFAULT_API_TIMEOUT,
      headers: {'Content-Type': 'application/json'},
    });
  }
}

const axiosConfig = new AxiosConfig();

export default axiosConfig;
