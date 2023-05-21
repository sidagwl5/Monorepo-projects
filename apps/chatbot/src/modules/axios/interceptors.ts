import { Axios, AxiosError } from 'axios';
import jsCookie from 'js-cookie';
import { supabase } from '../supabase';

export function setInterceptors(axios: Axios) {
  axios.interceptors.request.use((request) => {
    if (jsCookie.get('token')) {
      request.headers.Authorization = jsCookie.get('token');
    }

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (_error: AxiosError) => {
      const error = {
        status: _error.status || _error.response?.status,
        message: _error.message,
        trace: _error.stack,
      };

      if (error.status === 401 || error.status === 403) {
        supabase.auth.signOut();
        jsCookie.remove('token');
        window.location.href = '/login';
      }

      throw error;
    }
  );
}
