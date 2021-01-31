import gql from "graphql-tag";

export const CreateQuizMutation = gql`
  mutation CreateQuizMutation(
    $title: String!
    $content: String!
    $authorName: String!
    $authorEmail: String!
  ) {
    signupUser(name: $authorName, email: $authorEmail) {
      id
      name
      email
    }
    createQuiz(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`;
