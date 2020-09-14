import { Message } from '../Message';

export interface State {
  messages: Message[];
  message?: Message;
}

export interface Methods {
  addMessage(message: Message): void;
  addMessages(messages: Message[]): void;
  setMessages(messages: Message[]): void;
  updateMessage(message: Message): void;
  deleteMessage(message: Message): void;
  addReply(message: Message): void;
  updateReply(message: Message): void;
  deleteReply(message: Message): void;
}

export interface Action {
  type: ActionTypes;
  payload?: Partial<State>;
}

export type ActionTypes =
  | 'ADD_MESSAGE'
  | 'ADD_MESSAGES'
  | 'SET_MESSAGES'
  | 'UPDATE_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'ADD_REPLY'
  | 'UPDATE_REPLY'
  | 'DELETE_REPLY';
