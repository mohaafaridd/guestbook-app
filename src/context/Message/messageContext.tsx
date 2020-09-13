import { createContext } from 'react';
import { State, Methods } from '../../interfaces/context/message';

export const MessageContext = createContext<State & Methods>({
  messages: [],
  addMessage: () => undefined,
  addMessages: () => undefined,
  deleteMessage: () => undefined,
  updateMessage: () => undefined,
});

export const { Provider: MessageProvider, Consumer } = MessageContext;
