import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/core';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';
import { MessageContext } from '../../../context/Message/messageContext';
import { CREATE_MESSAGE } from '../../../graphql/message/CreateMessageMutation';
import { Message } from '../../../interfaces/Message';
type FormData = {
  content: string;
};

interface ReplyFormArgs {
  parent: Message;
}

export const ReplyForm = ({ parent }: ReplyFormArgs) => {
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);
  const { register, handleSubmit, errors, setValue } = useForm<FormData>();
  const toast = useToast();
  const { addReply } = useContext(MessageContext);

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
        parent: parent._id,
      },
    };

    try {
      const { data } = await createMessage({ variables });
      const message = data.createMessage;
      toast({
        description: 'Reply Created',
        status: 'success',
        duration: 1500,
        position: 'bottom-left',
      });
      addReply(message);
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
      </Stack>
    </form>
  );
};
