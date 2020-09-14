import { Box, Text } from '@chakra-ui/core';
import moment from 'moment';
import React from 'react';
import { Message } from '../../../interfaces/Message';
import LinkButton from '../../common/LinkButton';

interface ReplyCardArgs {
  reply: Message;
}

export const ReplyCard = ({ reply }: ReplyCardArgs) => {
  return (
    <Box
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      p={2}
      rounded='md'
    >
      <LinkButton
        to={`/users/${reply.author._id}`}
        color='gray.700'
        fontWeight='semibold'
        variant='link'
        fontSize={14}
      >
        {reply.author.name}
      </LinkButton>
      <Text fontSize={12} color='gray.500'>
        {moment(reply.createdAt).format('DD-MM-YYYY hh:mm A')}
      </Text>

      {reply.content}
    </Box>
  );
};
