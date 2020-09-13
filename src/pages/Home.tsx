import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { MessageList } from '../components/Messages/List';
import { MessageContext } from '../context/Message/messageContext';
import { FIND_ALL_MESSAGES } from '../graphql/message/GetAllMessagesQuery';

export const Home = () => {
  const { setMessages } = useContext(MessageContext);
  const { data, loading } = useQuery(FIND_ALL_MESSAGES);

  useEffect(() => {
    if (data) {
      const messages = data.findAllMessages;
      setMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <MessageList loading={loading} />;
};
