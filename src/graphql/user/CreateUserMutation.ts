import { gql } from '@apollo/client/core';

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      _id
      name
      email
      token
    }
  }
`;
