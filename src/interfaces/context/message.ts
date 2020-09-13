import { Message } from '../Message';

export interface State {
  messages: Message[];
  message?: Message;
}

export interface Methods {
  addMessage(message: Message): void;
  addMessages(messages: Message[]): void;
  updateMessage(message: Message): void;
  deleteMessage(message: Message): void;
}

export interface Action {
  type: ActionTypes;
  payload?: Partial<State>;
}

export type ActionTypes =
  | 'ADD_MESSAGE'
  | 'ADD_MESSAGES'
  | 'UPDATE_MESSAGE'
  | 'DELETE_MESSAGE';
