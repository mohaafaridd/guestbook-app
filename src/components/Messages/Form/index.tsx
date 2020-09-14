import { useMutation } from '@apollo/client';
import { Button, FormControl, Textarea, useToast } from '@chakra-ui/core';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext } from '../../../context/Message/messageContext';
import { CREATE_MESSAGE } from '../../../graphql/message/CreateMessageMutation';

type FormData = {
  content: string;
};

export const MessageForm = () => {
  const { addMessage } = useContext(MessageContext);
  const { register, handleSubmit, errors } = useForm<FormData>();
  const toast = useToast();
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);

  const onSubmit = handleSubmit(async (args) => {
    const variables = {
      data: {
        content: args.content,
      },
    };

    try {
      const { data } = await createMessage({ variables });
      const message = data.createMessage;
      toast({
        description: 'Message Created',
        status: 'success',
        duration: 1500,
        position: 'bottom-left',
      });
      addMessage(message);
    } catch (error) {
      toast({
        description: 'Could not submit message',
        status: 'error',
        duration: 1500,
        position: 'bottom-left',
      });
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormControl className='form-control' isInvalid={!!errors.content}>
          <Textarea name='content' placeholder='message' ref={register()} />
        </FormControl>

        <Button
          className='btn'
          tabIndex={5}
          isLoading={loading}
          type='submit'
          variantColor='green'
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
