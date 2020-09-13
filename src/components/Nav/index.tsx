import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth/authContext';
import { Button, Grid, Heading } from '@chakra-ui/core';
import LinkButton from '../common/LinkButton';

export const Nav = () => {
  const { authenticated, user } = useContext(AuthContext);

  return (
    <Grid
      alignItems='center'
      w='50%'
      mx='auto'
      templateColumns='4fr 1fr'
      gap={2}
      p={2}
    >
      <Heading size='lg'>Farid's Guestbook</Heading>
      {!authenticated && (
        <Grid templateColumns='1fr 1fr' gap={2}>
          <LinkButton to='/login'>Login</LinkButton>
          <LinkButton to='/register' variantColor='teal'>
            Register
          </LinkButton>
        </Grid>
      )}

      {authenticated && <Heading>Welcome {user?.name}</Heading>}
    </Grid>
  );
};
