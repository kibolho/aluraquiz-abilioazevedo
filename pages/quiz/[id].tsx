import { initializeApollo } from "@/lib/apollo/client";
import { QuizesQuery, QuizQuery } from "@/lib/prisma/queries";
import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";
import {
  fetchQuiz,
  fetchQuizes,
  filterMyQuiz,
  getExternalQuizes,
} from "../../src/utils/apiContentful";

export default function QuizDaGaleraPage({ quiz: { theme, questions, bg } }) {
  if (!theme || !questions || !bg) {
  }
  return (
    <ThemeProvider theme={theme}>
      <QuizScreen externalQuestions={questions} externalBg={bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps({ params }) {
  const quizId = String(params.id);
  if (quizId.includes("prisma")) {
    const quizIdDBPrisma =
      quizId?.split("__").length > 1 ? quizId?.split("__")[1] : null;
    const apolloClient = initializeApollo();

    const data = await apolloClient.query({
      query: QuizQuery,
      variables: {
        quizId: quizIdDBPrisma,
      },
    });
    if (!data?.data?.getQuiz?.content) throw new Error("Quiz não existe");
    const quiz = JSON.parse(data?.data?.getQuiz?.content);

    return {
      props: {
        quiz,
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

// export async function getStaticPaths() {
//   const quizes = await fetchQuizes();
//   const myQuiz = filterMyQuiz(quizes);
//   const externalQuizes = getExternalQuizes(myQuiz);
//   const apolloClient = initializeApollo();

//   const data = await apolloClient.query({
//     query: QuizesQuery,
//   });
//   const prismaDBQuizes = data?.data?.listQuizes?.map((item) => {
//     return {
//       id: `prisma__${item.id}`,
//       rawQuiz: null,
//       title: item.title,
//     };
//   });
//   return {
//     paths: [...quizes, ...externalQuizes, ...prismaDBQuizes].map(
//       (quiz) => `/quiz/${quiz.id}`
//     ),
//     fallback: true,
//   };
// }
