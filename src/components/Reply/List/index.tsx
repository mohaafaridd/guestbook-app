import { Stack } from '@chakra-ui/core';
import React from 'react';
import { Message } from '../../../interfaces/Message';
import { ReplyCard } from '../Card';

interface RepliesLists {
  replies: Message[];
}

export const RepliesList = ({ replies }: RepliesLists) => {
  return (
    <Stack spacing={2}>
      {replies.map((reply, i) => (
        <ReplyCard reply={reply} key={i} />
      ))}
    </Stack>
  );
};
