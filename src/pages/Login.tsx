import { useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import LinkButton from '../components/common/LinkButton';
import { AuthContext } from '../context/Auth/authContext';
import { LOGIN_USER } from '../graphql/user/LoginUserMutation';

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const { register, handleSubmit, errors } = useForm<FormData>();

  if (authContext.authenticated) {
    return <Redirect to='/' />;
  }

  const validation = {
    email: (value: string) => {
      if (validator.isEmail(value)) return true;
      return 'Please enter a valid email';
    },
  };

  const onSubmit = handleSubmit(async (args) => {
    const { email, password } = args;

    try {
      const variables = {
        data: { email, password },
      };
      const { data } = await loginUser({ variables });
      const user = data.loginUser;

      toast({
        duration: 1500,
        status: 'success',
        description: `Welcome ${user.name}`,
        position: 'bottom-left',
      });

      authContext.login(user, user.token);
    } catch (error) {
      authContext.logout();
      toast({
        duration: 1500,
        status: 'error',
        description: 'Login Failed',
        position: 'bottom-left',
      });
    }
  });

  return (
    <Stack
      spacing={2}
      w={['100%', '80%', '70%', '20%']}
      p={5}
      border={1}
      boxShadow='md'
      rounded='md'
      m='auto'
    >
      <Heading as='h2' size='md'>
        Login Form
      </Heading>
      <form onSubmit={onSubmit} autoComplete='off'>
        <Stack spacing={2} pt={1}>
          <FormControl className='form-control' isInvalid={!!errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              tabIndex={2}
              name='email'
              type='string'
              placeholder='donald@ducks.co'
              ref={register({ validate: validation.email })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl className='form-control' isInvalid={!!errors.password}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  icon={showPassword ? 'view' : 'view-off'}
                  variant='ghost'
                  aria-label='Show Password'
                  rounded='none'
                  roundedTopLeft='md'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputLeftElement>
              <Input
                tabIndex={3}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder={
                  showPassword ? 'bChL2G7pgGaqrCES' : '••••••••••••••••'
                }
                ref={register()}
              />
            </InputGroup>
          </FormControl>

          <Flex justifyContent='space-between' w='100%'>
            <LinkButton to='/register' className='form-control' variant='link'>
              New member?
            </LinkButton>

            <Button
              className='btn'
              tabIndex={5}
              isLoading={loading}
              type='submit'
              variantColor='green'
            >
              Submit
            </Button>
          </Flex>
        </Stack>
      </form>
    </Stack>
  );
};
