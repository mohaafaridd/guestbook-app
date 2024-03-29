import { Action, State } from '../../interfaces/context/message';
import { Message } from '../../interfaces/Message';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage = action.payload?.message;
      if (newMessage) {
        const messages = state.messages.concat(newMessage);
        return {
          messages,
        };
      }
      return state;
    }

    case 'ADD_MESSAGES': {
      const newMessages = action.payload?.messages;
      if (newMessages?.length) {
        const messages = state.messages.concat(...newMessages);
        return {
          messages,
        };
      }
      return state;
    }

    case 'SET_MESSAGE': {
      const message = action.payload?.message;
      if (!message) return { messages: state.messages };

      return { ...state, message };
    }

    case 'SET_MESSAGES': {
      const messages = action.payload?.messages;
      if (messages?.length) {
        return { messages };
      }

      return state;
    }

    case 'UPDATE_MESSAGE': {
      const updatedMessage = action.payload?.message;
      if (!updatedMessage) return state;

      const messages = state.messages.map((message) => {
        if (message._id === updatedMessage._id) {
          return updatedMessage;
        }

        return message;
      });

      return { messages };
    }

    case 'DELETE_MESSAGE': {
      const deletedMessage = action.payload?.message;
      if (!deletedMessage) return state;

      const messages = state.messages.filter(
        (message) => message._id !== deletedMessage._id
      );

      return { ...state, messages };
    }

    case 'ADD_REPLY': {
      const reply = action.payload?.message;
      if (!reply) return state;

      const messageIndex = state.messages.findIndex(
        (message) => message._id === reply.parent?._id
      );

      const parent: Message = JSON.parse(
        JSON.stringify(state.messages[messageIndex])
      );

      parent.replies.push(reply);

      const messages: Message[] = JSON.parse(JSON.stringify(state.messages));

      messages[messageIndex] = parent;

      return { messages };
    }

    case 'UPDATE_REPLY': {
      const reply = action.payload?.message;
      if (!reply) return state;
      console.log('reply', reply);
      const messageIndex = state.messages.findIndex(
        (message) => message._id === reply.parent?._id
      );
      console.log('messageIndex', messageIndex);

      const parent: Message = JSON.parse(
        JSON.stringify(state.messages[messageIndex])
      );

      const replyIndex = parent.replies.findIndex((r) => r._id === reply._id);

      if (replyIndex < 0) return state;
      parent.replies[replyIndex] = reply;

      const messages: Message[] = JSON.parse(JSON.stringify(state.messages));

      messages[messageIndex] = parent;

      return { messages };
    }

    case 'DELETE_REPLY': {
      const reply = action.payload?.message;
      if (!reply) return state;

      const messageIndex = state.messages.findIndex(
        (message) => message._id === reply.parent?._id
      );

      const parent: Message = JSON.parse(
        JSON.stringify(state.messages[messageIndex])
      );

      const replyIndex = parent.replies.findIndex((r) => r._id === reply._id);

      if (replyIndex < 0) return state;
      parent.replies.splice(replyIndex, 1);

      const messages: Message[] = JSON.parse(JSON.stringify(state.messages));

      messages[messageIndex] = parent;

      return { messages };
    }

    default:
      return state;
  }
};
