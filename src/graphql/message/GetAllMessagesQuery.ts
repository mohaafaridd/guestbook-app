import { gql } from '@apollo/client/core';

export const CREATE_MESSAGE = gql`
  query FindAllMessages {
    findAllMessages {
      _id
      content
      createdAt
      updatedAt
      author {
        _id
        name
        email
      }
    }
  }
`;
