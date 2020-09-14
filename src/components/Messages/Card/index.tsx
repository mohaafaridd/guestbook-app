import { Box, Text } from '@chakra-ui/core';
import moment from 'moment';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/Auth/authContext';
import { Message } from '../../../interfaces/Message';
import LinkButton from '../../common/LinkButton';
import { ReplyForm } from '../../Reply/Form';
import { RepliesList } from '../../Reply/List';

interface MessageCardArgs {
  message: Message;
}

export const MessageCard = ({ message }: MessageCardArgs) => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Box
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      px={4}
      py={2}
      rounded='lg'
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

      <Text py={4} px={2}>
        {message.content}
      </Text>

      {authenticated && <ReplyForm parent={message} />}
      <RepliesList replies={message.replies} />
    </Box>
  );
};
