import { createContext } from 'react';
import { State, Methods } from '../../interfaces/context/auth';

export const AuthContext = createContext<State & Methods>({
  authenticated: false,
  login: (user, token) => undefined,
  logout: () => undefined,
  setUser: () => undefined,
  getUser: () => undefined,
});

export const { Provider: AuthProvider, Consumer } = AuthContext;
