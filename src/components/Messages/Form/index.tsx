import { useMutation } from '@apollo/client';
import { Button, FormControl, Textarea, useToast } from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext } from '../../../context/Message/messageContext';
import { CREATE_MESSAGE } from '../../../graphql/message/CreateMessageMutation';
import { UPDATE_MESSAGE } from '../../../graphql/message/UpdateMessageMutation';

type FormData = {
  content: string;
};

export const MessageForm = () => {
  const {
    addMessage,
    updateMessage: refreshMessage,
    message: contextMessage,
    setMessage,
  } = useContext(MessageContext);
  const { register, handleSubmit, errors, setValue, watch } = useForm<
    FormData
  >();
  const toast = useToast();
  const [createMessage, { loading: creationLoading }] = useMutation(
    CREATE_MESSAGE
  );
  const [updateMessage, { loading: updateLoading }] = useMutation(
    UPDATE_MESSAGE
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (contextMessage && !contextMessage.parent) {
      setEditMode(true);
      setValue('content', contextMessage?.content);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextMessage]);

  const onExitEditMode = () => {
    setMessage();
  };

  const onSubmit = handleSubmit(async (args) => {
    const variables = {
      data: {
        content: args.content,
        ...(editMode && { messageId: contextMessage?._id }),
      },
    };

    try {
      if (editMode) {
        const { data } = await updateMessage({ variables });
        const message = data.updateMessage;
        toast({
          description: 'Message Updated',
          status: 'success',
          duration: 1500,
          position: 'bottom-left',
        });
        refreshMessage(message);
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
          isLoading={creationLoading || updateLoading}
          type='submit'
          variantColor='green'
          isDisabled={watch().content?.length === 0}
        >
          {editMode ? 'Edit' : 'Submit'}
        </Button>

        {editMode && (
          <Button
            className='btn'
            tabIndex={5}
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
