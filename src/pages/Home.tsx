import React, { useContext } from 'react';
import { AuthContext } from '../context/Auth/authContext';

export const Home = () => {
  const { authenticated } = useContext(AuthContext);

  return <div>{authenticated ? "You're logged in" : 'Login or Register'}</div>;
};
