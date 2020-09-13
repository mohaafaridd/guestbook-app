import React, { useContext } from 'react';
import { MessageContext } from '../../../context/Message/messageContext';

interface MessageListArgs {
  loading: boolean;
}

export const MessageList = ({ loading = false }: MessageListArgs) => {
  const { messages } = useContext(MessageContext);
  if (loading) return <h1>Loading</h1>;
  return <div>{messages.length}</div>;
};
