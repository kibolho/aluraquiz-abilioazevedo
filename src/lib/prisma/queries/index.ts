import gql from "graphql-tag";

export const QuizesQuery = gql`
  query ListQuizes {
    listQuizes {
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

export const QuizQuery = gql`
query GetQuiz($quizId: String!) {
  getQuiz(quizId: $quizId) {
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