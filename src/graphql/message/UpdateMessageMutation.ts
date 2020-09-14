import { gql } from '@apollo/client/core';

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($data: UpdateMessageInput!) {
    updateMessage(data: $data) {
      _id
      content
      createdAt
      updatedAt
      author {
        _id
        name
        email
      }

      replies {
        _id
        content
        author {
          _id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;
