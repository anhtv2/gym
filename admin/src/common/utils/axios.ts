import axios, { AxiosRequestConfig } from 'axios';
import config from '@/config';
import { showMessage } from '@/common/utils/helpers';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

const api = axios.create({
  baseURL: config.VITE_BASE_API,
  proxy: false,
  responseType: 'json',
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const newConfig: AxiosRequestConfig = { ...config };

    if (localStorage.getItem('token')) {
      const authHeader = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      newConfig.headers = { ...config.headers, ...authHeader };
    }

    return newConfig;
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data.message;
      showMessage(message, false);

      if (error.response.status === 400) {
        const object: { [key: string]: any } = {};
        for (const itemObject of error.response.data.message) {
          for (const property in itemObject) {
            if (!object[property]) {
              object[property] = [];
            }
            for (const validator in itemObject[property]) {
              object[property].push(itemObject[property][validator]);
            }
          }
        }
        return Promise.reject({
          status: error.response.status,
          error: true,
          errorMessages: object,
          response: error.response,
        });
      } else if (error.response.status === 401) {
        useAuthStore().logout();
        return Promise.reject({
          status: error.response.status,
          error: true,
          errorMessages: null,
          response: error.response,
        });
      } else if (error.response.status === 404) {
        router.push({ name: 'errors.404' });
        return Promise.reject({
          status: error.response.status,
          error: true,
          errorMessages: null,
          response: error.response,
        });
      } else if (error.response.status === 403) {
        router.push({ name: 'errors.403' });
        return Promise.reject({
          status: error.response.status,
          error: true,
          errorMessages: null,
          response: error.response,
        });
      }
    }
    return Promise.reject(error);
  },
);

export default api;
