import { gql } from "apollo-boost";

export default gql`
  mutation($title: String!, $content: String!, $published: Boolean) {
    quizCreate(title: $title, content: $content, published: $published) {
      title
      content
    }
  }
`;
