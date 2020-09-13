import { Message } from '../Message';

export interface State {
  messages: Message[];
}

export interface Methods {
  addMessage(message: Message): void;
  addMessages(messages: Message[]): void;
  updateMessage(id: string, message: Message): void;
  deleteMessage(id: string): void;
}

export interface Action {
  type: ActionTypes;
  payload?: State;
}

export type ActionTypes =
  | 'ADD_MESSAGE'
  | 'ADD_MESSAGES'
  | 'UPDATE_MESSAGE'
  | 'DELETE_MESSAGE';
