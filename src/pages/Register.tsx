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
  Progress,
  Stack,
  useToast,
} from '@chakra-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import LinkButton from '../components/common/LinkButton';
import { AuthContext } from '../context/Auth/authContext';
import { CREATE_USER } from '../graphql/user/CreateUserMutation';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmation: string;
};

export const Register = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const { register, handleSubmit, watch, errors, setError } = useForm<
    FormData
  >();

  if (authContext.authenticated) {
    return <Redirect to='/' />;
  }

  const validation = {
    name: (value: string) => {
      if (value.length > 0) return true;
      return 'Please provide a name';
    },

    email: (value: string) => {
      if (validator.isEmail(value)) return true;

      return 'Please enter a valid email';
    },

    password: (value: string) => {
      value = value.trim();
      if (value.length < 6)
        return 'Please write a minimum 6 characters length password';
      if (zxcvbn(value).score < 3) return 'Please pick a stronger password';
      return true;
    },

    confirmation: (value: string) => {
      if (value.length < 6)
        return 'Please write a minimum 6 characters length password';
      if (value === watch('password')) return true;
      return "Passwords don't match";
    },
  };

  const onSubmit = handleSubmit(async (args) => {
    const { name, email, password } = args;

    try {
      const variables = {
        data: { name, email, password },
      };
      const { data } = await createUser({ variables });
      const user = data.createUser;

      toast({
        duration: 1500,
        status: 'success',
        description: `Welcome ${user.name}`,
        position: 'bottom-left',
      });

      authContext.login(user, user.token);
    } catch (error) {
      authContext.logout();
      const unique = error.message.includes('duplicate');
      if (unique) {
        setError('email', { message: 'Email is already registered' });
      }
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
        Registration Form
      </Heading>
      <form onSubmit={onSubmit} autoComplete='off'>
        <Stack spacing={2} pt={1}>
          <FormControl className='form-control' isInvalid={!!errors.name}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              tabIndex={1}
              name='name'
              placeholder='Donald Trump'
              ref={register({ validate: validation.name })}
              aria-describedby='name-helper-text'
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

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
                ref={register({ validate: validation.password })}
                roundedBottom={0}
              />
            </InputGroup>
            <Progress
              hasStripe
              value={zxcvbn(watch('password') || '').score * 25}
              color={
                zxcvbn(watch('password') || '').score < 3 ? 'red' : 'green'
              }
              roundedBottom='md'
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            className='form-control'
            isInvalid={!!errors.confirmation}
          >
            <FormLabel htmlFor='confirmation'>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  icon={showConfirmation ? 'view' : 'view-off'}
                  variant='ghost'
                  aria-label='Show Confirmation'
                  rounded='none'
                  roundedLeft='md'
                  onClick={() => setShowConfirmation(!showConfirmation)}
                />
              </InputLeftElement>
              <Input
                tabIndex={4}
                type={showConfirmation ? 'text' : 'password'}
                name='confirmation'
                placeholder={
                  showConfirmation ? 'bChL2G7pgGaqrCES' : '••••••••••••••••'
                }
                ref={register({ validate: validation.confirmation })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmation && errors.confirmation.message}
            </FormErrorMessage>
          </FormControl>

          <Flex justifyContent='space-between' w='100%'>
            <LinkButton to='/login' className='form-control' variant='link'>
              Already a member?
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
