/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";
import { getExternalQuizes, filterMyQuiz, fetchQuizes, fetchQuiz } from "../../src/utils/apiContentful";

export default function QuizDaGaleraPage({ quiz }) {
  return (
    <ThemeProvider theme={quiz?.theme}>
      <QuizScreen externalQuestions={quiz?.questions} externalBg={quiz?.bg} />
    </ThemeProvider>
  );
}

export async function getStaticProps({ params }) {
  const quizId = String(params.id);
  if(quizId.includes("http")){
    try {
      const dbExterno = await fetch(`${quizId}/api/db`)
        .then((respostaDoServer) => {
          if (respostaDoServer.ok) {
            return respostaDoServer.json();
          }
          throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
      return {
        props: {
          quiz: dbExterno,
        },
      };
    } catch(err) {
      throw new Error(err);
    }
  }

  const quizes = await fetchQuizes();
  const quiz = fetchQuiz(quizes,quizId);
  return {
    props: {
      quiz: quiz.rawQuiz,
    },
  };
}

export async function getStaticPaths() {
  const quizes = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizes);
  const externalQuizes = getExternalQuizes(myQuiz);
  return {
    paths: [...quizes,...externalQuizes].map((quiz) => `/quiz/${quiz.id}`),
    fallback: true,
  };
}
