import { useQuery } from '@apollo/client';
import { Grid } from '@chakra-ui/core';
import React, { useContext, useEffect } from 'react';
import { MessageForm } from '../components/Messages/Form';
import { MessageList } from '../components/Messages/List';
import { AuthContext } from '../context/Auth/authContext';
import { MessageContext } from '../context/Message/messageContext';
import { FIND_ALL_MESSAGES } from '../graphql/message/GetAllMessagesQuery';

export const Home = () => {
  const { setMessages } = useContext(MessageContext);
  const { authenticated } = useContext(AuthContext);
  const { data, loading } = useQuery(FIND_ALL_MESSAGES);

  useEffect(() => {
    if (data) {
      const messages = data.findAllMessages;
      setMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Grid gap={2} w={['100%', '80%', '70%', '50%']} mx='auto'>
      {authenticated && <MessageForm />}
      <MessageList loading={loading} />
    </Grid>
  );
};
