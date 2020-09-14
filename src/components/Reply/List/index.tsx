import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
} from '@chakra-ui/core';
import React from 'react';
import { Message } from '../../../interfaces/Message';
import { ReplyCard } from '../Card';

interface RepliesLists {
  replies: Message[];
}

export const RepliesList = ({ replies }: RepliesLists) => {
  return (
    <Accordion defaultIndex={[1]} allowToggle>
      <AccordionItem defaultIsOpen={false}>
        <AccordionHeader>
          <Box flex='1' textAlign='left'>
            {replies.length} Replies
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        {replies.map((reply, i) => (
          <AccordionPanel pb={4} key={i}>
            <ReplyCard reply={reply} />
          </AccordionPanel>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
