import { useMutation } from '@apollo/client';
import { Button, FormControl, Textarea, useToast } from '@chakra-ui/core';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext } from '../../../context/Message/messageContext';
import { CREATE_MESSAGE } from '../../../graphql/message/CreateMessageMutation';

type FormData = {
  content: string;
};

export const MessageForm = () => {
  const { addMessage, message: contextMessage, setMessage } = useContext(
    MessageContext
  );
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    watch,
  } = useForm<FormData>();
  const toast = useToast();
  const [createMessage, { loading: creationLoading }] = useMutation(
    CREATE_MESSAGE
  );

  useEffect(() => {
    setValue('content', contextMessage?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextMessage]);

  const onExitEditMode = () => {
    setMessage();
  };

  const onSubmit = handleSubmit(async (args) => {
    const variables = {
      data: {
        content: args.content,
      },
    };

    try {
      if (MessageContext) {
      } else {
        const { data } = await createMessage({ variables });
        const message = data.createMessage;
        toast({
          description: 'Message Created',
          status: 'success',
          duration: 1500,
          position: 'bottom-left',
        });
        addMessage(message);
      }
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
          isLoading={creationLoading}
          type='submit'
          variantColor='green'
          isDisabled={watch().content?.length === 0}
        >
          {contextMessage ? 'Edit' : 'Submit'}
        </Button>

        {contextMessage && (
          <Button
            className='btn'
            tabIndex={5}
            isLoading={loading}
            onClick={() => {
              onExitEditMode();
            }}
            variant='outline'
            variantColor='red'
            isDisabled={watch().content?.length === 0}
          >
            Exit
          </Button>
        )}
      </form>
    </div>
  );
};
