/* eslint-disable no-param-reassign */
import axios from 'axios';
import 'babel-polyfill';

const api = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

api.interceptors.request.use(async config => config);

export default api;
