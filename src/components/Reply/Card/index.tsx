import { useMutation } from '@apollo/client';
import { Box, Flex, Grid, IconButton, Text, useToast } from '@chakra-ui/core';
import moment from 'moment';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/Auth/authContext';
import { MessageContext } from '../../../context/Message/messageContext';
import { DELETE_MESSAGE } from '../../../graphql/message/DeleteMessageMutation';
import { Message } from '../../../interfaces/Message';

interface ReplyCardArgs {
  reply: Message;
}

export const ReplyCard = ({ reply }: ReplyCardArgs) => {
  const toast = useToast();
  const { authenticated, user } = useContext(AuthContext);
  const {
    setMessage,
    message: contextReply,
    deleteReply: removeReply,
  } = useContext(MessageContext);

  const [deleteReply, { loading: deleteLoading }] = useMutation(DELETE_MESSAGE);

  const onEdit = () => {
    setMessage(reply);
  };

  const onDelete = async () => {
    try {
      const variables = {
        id: reply._id,
      };
      const { data } = await deleteReply({ variables });
      const deletedReply: Message = data.deleteMessage;
      console.log('deletedReply', deletedReply);
      removeReply(deletedReply);
      toast({
        description: 'Reply Deleted',
        status: 'success',
        duration: 1500,
        position: 'bottom-left',
      });
    } catch (error) {
      toast({
        description: 'Could not delete the message',
        status: 'error',
        duration: 1500,
        position: 'bottom-left',
      });
    }
  };

  return (
    <Box
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      p={2}
      rounded='md'
    >
      <Grid
        templateRows={['repeat(4, auto)', '1fr']}
        templateColumns={['1fr', 'repeat(2, auto)']}
      >
        <Box>
          <Text color='gray.700' fontWeight='semibold' fontSize={14}>
            {reply.author.name}
          </Text>
          <Text fontSize={12} color='gray.500'>
            {moment(reply.createdAt).format('DD-MM-YYYY hh:mm A')}
          </Text>
        </Box>

        {authenticated && user?._id === reply.author._id && (
          <Flex
            flexDir={['column', 'row']}
            justify='flex-end'
            alignItems={['stretch', 'center']}
          >
            <IconButton
              size='sm'
              aria-label='edit message'
              variantColor='green'
              icon='edit'
              onClick={onEdit}
              isDisabled={contextReply?._id === reply._id}
            />
            <IconButton
              onClick={onDelete}
              mt={[2, 0]}
              ml={[0, 2]}
              size='sm'
              aria-label='delete-message'
              variant='outline'
              variantColor='red'
              icon='delete'
              isDisabled={contextReply?._id === reply._id}
              isLoading={deleteLoading}
            />
          </Flex>
        )}
      </Grid>

      {reply.content}
    </Box>
  );
};
