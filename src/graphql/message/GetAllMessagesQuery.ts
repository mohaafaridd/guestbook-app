import { gql } from '@apollo/client/core';

export const FIND_ALL_MESSAGES = gql`
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
