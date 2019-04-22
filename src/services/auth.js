import { TOKEN_KEY_VAI_CAR } from '../helpers/constants';

export const TOKEN_KEY = TOKEN_KEY_VAI_CAR;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
