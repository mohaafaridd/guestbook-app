import { Stack } from '@chakra-ui/core';
import React from 'react';
import { Message } from '../../../interfaces/Message';

interface RepliesLists {
  messages: Message[];
}

export const RepliesList = ({ messages }: RepliesLists) => {
  return (
    <Stack>
      {messages.map((message, i) => (
        <div key={i}>{message.content}</div>
      ))}
    </Stack>
  );
};
