import React, { FC, useReducer } from 'react';
import { MessageProvider } from './messageContext';
import { State, Methods } from '../../interfaces/context/message';
import { reducer } from './messageReducer';

export const MessageState: FC = ({ children }) => {
  const initialState: State = {
    messages: [],
    message: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const methods: Methods = {
    addMessage: (message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: { message } });
    },

    addMessages: (messages) => {
      dispatch({ type: 'ADD_MESSAGES', payload: { messages } });
    },

    setMessages: (messages) => {
      dispatch({ type: 'SET_MESSAGES', payload: { messages } });
    },

    updateMessage: (message) => {
      dispatch({ type: 'UPDATE_MESSAGE', payload: { message } });
    },

    deleteMessage: (message) => {
      dispatch({ type: 'DELETE_MESSAGE', payload: { message } });
    },
  };

  return (
    <MessageProvider
      value={{
        ...state,
        ...methods,
      }}
    >
      {children}
    </MessageProvider>
  );
};
