import { Grid } from '@chakra-ui/core';
import React, { useContext } from 'react';
import { MessageContext } from '../../../context/Message/messageContext';
import { MessageCard } from '../Card';

interface MessageListArgs {
  loading: boolean;
}

export const MessageList = ({ loading = false }: MessageListArgs) => {
  const { messages } = useContext(MessageContext);
  if (loading) return <h1>Loading</h1>;
  return (
    <Grid gap={5}>
      {messages.map((message, i) => (
        <MessageCard message={message} key={i} />
      ))}
    </Grid>
  );
};
