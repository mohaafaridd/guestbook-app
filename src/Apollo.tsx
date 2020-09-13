import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/Auth/authContext';

const createApolloClient = () =>
  new ApolloClient({
    uri: process.env.REACT_APP_API_URI,
    cache: new InMemoryCache(),
  });

export const Apollo: FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [client, setClient] = useState(createApolloClient());

  useEffect(() => {
    setClient(createApolloClient());
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
