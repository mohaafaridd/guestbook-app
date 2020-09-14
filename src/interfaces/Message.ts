import { User } from './User';

export interface Message {
  _id: string;
  content: string;
  author: User;
  parent?: Message;
  replies: Message[];
  createdAt: Date;
  updatedAt: Date;
}
