import React, { FC } from 'react';
import { AuthState } from './Auth/AuthState';
import { MessageState } from './Message/MessageState';
export const Context: FC = ({ children }) => {
  return (
    <AuthState>
      <MessageState>{children}</MessageState>
    </AuthState>
  );
};
