import React, { FC } from 'react';
import { AuthState } from './Auth/AuthState';

export const Context: FC = ({ children }) => {
  return <AuthState>{children}</AuthState>;
};
