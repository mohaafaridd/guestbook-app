import { createContext } from 'react';
import { State, Methods } from '../../interfaces/context/message';

export const MessageContext = createContext<State & Methods>({
  messages: [],
  addMessage: () => undefined,
  addMessages: () => undefined,
  setMessages: () => undefined,
  deleteMessage: () => undefined,
  updateMessage: () => undefined,
  addReply: () => undefined,
  updateReply: () => undefined,
  deleteReply: () => undefined,
});

export const { Provider: MessageProvider, Consumer } = MessageContext;
