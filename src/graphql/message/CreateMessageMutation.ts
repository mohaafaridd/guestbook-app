import { gql } from '@apollo/client/core';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($data: CreateMessageInput!) {
    createMessage(data: $data) {
      _id
      content
      createdAt
      updatedAt
      author {
        _id
        name
        email
      }

      parent {
        _id
        content
        author {
          _id
          name
        }
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
