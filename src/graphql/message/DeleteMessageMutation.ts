import { gql } from '@apollo/client/core';

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      _id
      parent {
        _id
      }
    }
  }
`;
