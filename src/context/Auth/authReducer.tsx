import { State, Action } from '../../interfaces/context/auth';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload?.user,
      };
    }

    case 'LOGIN':
      return {
        ...state,
        ...action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        token: undefined,
        user: undefined,
      };

    default:
      return state;
  }
};
