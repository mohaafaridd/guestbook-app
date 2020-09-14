import { useMutation } from '@apollo/client';
import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';
import { MessageContext } from '../../../context/Message/messageContext';
import { CREATE_MESSAGE } from '../../../graphql/message/CreateMessageMutation';
import { UPDATE_MESSAGE } from '../../../graphql/message/UpdateMessageMutation';
import { Message } from '../../../interfaces/Message';
type FormData = {
  content: string;
};

interface ReplyFormArgs {
  parent: Message;
}

export const ReplyForm = ({ parent }: ReplyFormArgs) => {
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);
  const [updateReply, { loading: updateLoading }] = useMutation(UPDATE_MESSAGE);
  const { register, handleSubmit, errors, setValue } = useForm<FormData>();
  const toast = useToast();
  const { addReply, message: contextReply, setMessage: setReply } = useContext(
    MessageContext
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (contextReply?.parent) {
      setEditMode(true);
      setValue('content', contextReply.content);
    } else {
      setEditMode(false);
      setValue('content', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextReply]);

  const validation = {
    content: (value: string) => {
      if (value.length) return true;
      return 'Please enter a valid reply';
    },
  };

  const onSubmit = handleSubmit(async (args) => {
    const variables = {
      data: {
        content: args.content,
        ...(!editMode && { parent: parent?._id }),
        ...(editMode && { messageId: contextReply?._id }),
      },
    };

    try {
      if (editMode) {
        const { data } = await updateReply({ variables });
        const reply = data.updateMessage;
        toast({
          description: 'Message Updated',
          status: 'success',
          duration: 1500,
          position: 'bottom-left',
        });
      } else {
        const { data } = await createMessage({ variables });
        const message = data.createMessage;
        toast({
          description: 'Reply Created',
          status: 'success',
          duration: 1500,
          position: 'bottom-left',
        });
        addReply(message);
      }
    } catch (error) {
      toast({
        description: 'Could not submit reply',
        status: 'error',
        duration: 1500,
        position: 'bottom-left',
      });
    }

    setValue('content', '');
  });

  const onExitEditMode = () => {
    setReply();
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack isInline spacing={2} pb={2}>
        <FormControl w='100%' isInvalid={!!errors.content}>
          <Input
            name='content'
            placeholder='Type your reply'
            ref={register({ validate: validation.content })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>

        <IconButton
          type='submit'
          isLoading={loading}
          variantColor='green'
          aria-label='Submit reply'
          icon={MdSend}
        />

        {editMode && (
          <IconButton
            onClick={() => {
              onExitEditMode();
            }}
            isLoading={loading}
            variant='outline'
            variantColor='red'
            aria-label='Submit reply'
            icon='close'
          />
        )}
      </Stack>
    </form>
  );
};
