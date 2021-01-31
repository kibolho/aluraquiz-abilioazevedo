import QuizContainer from "@/components/QuizContainer";
import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";
import SuccessWidget from "src/screens/Quiz/SuccessWidget";
import { ThemeProvider } from "styled-components";
import Footer from "../../../src/components/Footer";
import GitHubCorner from "../../../src/components/GitHubCorner";
import QuizBackground from "../../../src/components/QuizBackground";
import {
  addApolloState,
  initializeApollo,
} from "../../../src/lib/apollo/client";
import { fetchQuizes, filterMyQuiz } from "../../../src/utils/apiContentful";
import { useRouter } from "next/router";
import { CustomATag } from "@/components/CustomATag";

function AddQuizSuccess({ quiz, params }) {
  const {
    query: { quizId },
  } = useRouter();

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://abilioazevedo.com.br";

  return (
    <ThemeProvider theme={quiz?.theme}>
      <QuizBackground backgroundImage={quiz.bg}>
        <Head>
          <title>Quiz Criado com Sucesso - AluraQuiz</title>
        </Head>
        <QuizContainer>
          <SuccessWidget>
            <p>Quiz criado com sucesso!</p>
            <CustomATag href={`/quiz/prisma__${quizId}`}>
              Acessar meu quiz
            </CustomATag>
          </SuccessWidget>
          <Footer
            as={motion.footer}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/kibolho/aluraquiz-abilioazevedo" />
      </QuizBackground>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const quizes = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizes);

  const apolloClient = initializeApollo();

  return addApolloState(apolloClient, {
    props: {
      quiz: myQuiz?.rawQuiz,
    },
    revalidate: 1,
  });
}

export default AddQuizSuccess;
