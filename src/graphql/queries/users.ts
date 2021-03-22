import { gql } from "apollo-boost";

export default gql`
  query {
    users {
      email
      name
      id
      quizes
    }
  }
`;
