import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth/authContext';
import { Button, Grid, Heading } from '@chakra-ui/core';
import LinkButton from '../common/LinkButton';

export const Nav = () => {
  const { authenticated, user } = useContext(AuthContext);

  return (
    <Grid
      alignItems='center'
      w={['100%', '80%', '70%', '50%']}
      mx='auto'
      templateColumns={['1fr', '2fr 1fr', '2fr 1fr']}
      gap={2}
      py={2}
    >
      <Heading size='lg' mx={['mx-auto', 0]}>
        Farid's Guestbook
      </Heading>
      {!authenticated && (
        <Grid
          templateColumns={['1fr', '1fr 1fr']}
          templateRows={['1fr 1fr', '1fr']}
          gap={2}
        >
          <LinkButton variant='ghost' to='/login'>
            Login
          </LinkButton>
          <LinkButton to='/register' variantColor='teal'>
            Register
          </LinkButton>
        </Grid>
      )}

      {authenticated && (
        <Grid
          templateColumns={['1fr', '1fr 1fr']}
          templateRows={['1fr 1fr', '1fr']}
          gap={2}
        >
          <Heading size='sm'>Welcome {user?.name}</Heading>
          <Button variant='outline' variantColor='red'>
            Logout
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
