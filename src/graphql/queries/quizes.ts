import { gql } from "apollo-boost";

export default gql`
  query {
    quizes {
      id
      title
      content
    }
  }
`;
