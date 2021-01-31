import { initializeApollo } from "@/lib/apollo/client";
import React from "react";
import gql from "graphql-tag";

import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";
import {
  getExternalQuizes,
  filterMyQuiz,
  fetchQuizes,
  fetchQuiz,
} from "../../src/utils/apiContentful";
import { QuizesQuery, QuizQuery } from "@/lib/prisma/queries";

export default function QuizDaGaleraPage({ quiz }) {
  return (
    <ThemeProvider theme={quiz?.theme}>
      <QuizScreen externalQuestions={quiz?.questions} externalBg={quiz?.bg} />
    </ThemeProvider>
  );
}

export async function getStaticProps({ params }) {
  const quizId = String(params.id);
  console.log("quizId", quizId, quizId.includes("prismaDBQuizes"));
  if (quizId.includes("prismaDBQuizes")) {
    const quizIdDBPrisma =
      quizId?.split("__").length > 1 ? quizId?.split("__")[1] : null;
    const apolloClient = initializeApollo();

    const data = await apolloClient.query({
      query: QuizQuery,
      variables: {
        quizId: quizIdDBPrisma,
      },
    });
    return {
      props: {
        quiz: JSON.parse(data?.data.getQuiz.content),
      },
    };
  }

  if (quizId.includes("http")) {
    try {
      const dbExterno = await fetch(`${quizId}/api/db`)
        .then((respostaDoServer) => {
          if (respostaDoServer.ok) {
            return respostaDoServer.json();
          }
          throw new Error("Falha em pegar os dados");
        })
        .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
      return {
        props: {
          quiz: dbExterno,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  const quizes = await fetchQuizes();
  const quiz = fetchQuiz(quizes, quizId);
  return {
    props: {
      quiz: quiz?.rawQuiz,
    },
  };
}

export async function getStaticPaths() {
  const quizes = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizes);
  const externalQuizes = getExternalQuizes(myQuiz);
  const apolloClient = initializeApollo();

  const data = await apolloClient.query({
    query: QuizesQuery,
  });
  const prismaDBQuizes = data?.data?.listQuizes?.map((item) => {
    return {
      id: `prismaDBQuizes__${item.id}`,
      rawQuiz: null,
      title: item.title,
    };
  });
  return {
    paths: [...quizes, ...externalQuizes, ...prismaDBQuizes].map(
      (quiz) => `/quiz/${quiz.id}`
    ),
    fallback: true,
  };
}
