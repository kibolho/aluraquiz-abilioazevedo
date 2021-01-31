import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";
import { fetchQuizes, filterMyQuiz } from "../../src/utils/apiContentful";
import { useRouter } from "next/router";

export default function MyQuiz({ quiz }) {
  const {
    query: { playerName },
  } = useRouter();

  return (
    <ThemeProvider theme={quiz.theme}>
      <QuizScreen playerName={String(playerName)} externalQuestions={quiz.questions} externalBg={quiz.bg} />
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const quizes = await fetchQuizes();
  const quiz = filterMyQuiz(quizes);
  return {
    props: {
      quiz: quiz?.rawQuiz,
    },
  };
}
