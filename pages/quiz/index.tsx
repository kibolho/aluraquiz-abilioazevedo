/* eslint-disable react/prop-types */
import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";
import { addNewQuiz, fetchQuizes, filterMyQuiz } from "../../src/utils/apiContentful";

export default function QuizDaGaleraPage({ quiz }) {
  return (
    <ThemeProvider theme={quiz.theme}>
      <QuizScreen externalQuestions={quiz.questions} externalBg={quiz.bg} />
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const quizes = await fetchQuizes();
  const quiz = filterMyQuiz(quizes);
  addNewQuiz("Teste",quiz?.rawQuiz)
  return {
    props: {
      quiz: quiz?.rawQuiz,
    },
  };
}
