import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import { Message } from '../../../interfaces/Message';
import LinkButton from '../../common/LinkButton';
import moment from 'moment';
import { RepliesList } from '../../Reply/List';

interface MessageCardArgs {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardArgs) => {
  return (
    <Box
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      p={2}
      rounded='md'
      boxShadow='sm'
    >
      <LinkButton
        to={`/users/${message.author._id}`}
        color='gray.700'
        fontWeight='semibold'
        variant='link'
        fontSize={14}
      >
        {message.author.name}
      </LinkButton>
      <Text fontSize={12} color='gray.500'>
        {moment(message.createdAt).format('DD-MM-YYYY hh:mm A')}
      </Text>

      <Text>{message.content}</Text>

      {message.replies.length && <RepliesList messages={message.replies} />}
    </Box>
  );
};
