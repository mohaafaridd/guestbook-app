import { gql } from '@apollo/client/core';

export const LOGIN_USER = gql`
  mutation LoginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      _id
      name
      email
      token
    }
  }
`;
