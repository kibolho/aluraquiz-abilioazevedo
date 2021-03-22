import { gql } from "apollo-boost";

export default gql`
  query {
    user {
      email
      name
      id
      quizes
    }
  }
`;
