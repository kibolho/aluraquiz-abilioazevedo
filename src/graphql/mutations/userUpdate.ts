import { gql } from "apollo-boost";

export default gql`
  mutation($email: String!, $name: String) {
    userUpdate(email: $email, name: $name) {
      email
      name
    }
  }
`;
