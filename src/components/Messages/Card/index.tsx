import { Box, Flex, Grid, IconButton, Stack, Text } from '@chakra-ui/core';
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
  const { authenticated, user } = useContext(AuthContext);
  return (
    <Grid
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      px={4}
      py={2}
      rounded='lg'
      boxShadow='sm'
      gap={2}
      templateRows={['repeat(4, auto)']}
      templateColumns={['1fr']}
    >
      <Grid
        templateRows={['repeat(4, auto)', '1fr']}
        templateColumns={['1fr', 'repeat(2, auto)']}
      >
        <Box>
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
        </Box>

        {authenticated && user?._id === message.author._id && (
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
            />
            <IconButton
              mt={[2, 0]}
              ml={[0, 2]}
              size='sm'
              aria-label='delete-message'
              variant='outline'
              variantColor='red'
              icon='delete'
            />
          </Flex>
        )}
      </Grid>

      <Text py={4} px={2}>
        {message.content}
      </Text>

      <Box>
        {authenticated && <ReplyForm parent={message} />}
        <RepliesList replies={message.replies} />
      </Box>
    </Grid>
  );
};
