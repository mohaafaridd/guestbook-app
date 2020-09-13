import { createContext } from 'react';
import { State, Methods } from '../../interfaces/context/auth';

const AuthContext = createContext<State & Methods>({
  authenticated: false,
  login: (user, token) => undefined,
  logout: () => undefined,
  setUser: () => undefined,
  getUser: () => undefined,
});

export const { Provider: AuthProvider, Consumer } = AuthContext;
export default AuthContext;
