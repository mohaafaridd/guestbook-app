import { State, Action } from '../../interfaces/context/message';

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

      return { messages };
    }

    default:
      return state;
  }
};
