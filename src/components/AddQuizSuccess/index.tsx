import { CustomATag } from "@/components/CustomATag";
import QuizContainer from "@/components/QuizContainer";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import SuccessWidget from "src/screens/Quiz/SuccessWidget";
import { ThemeProvider } from "styled-components";
import { addApolloState, initializeApollo } from "../../lib/apollo/client";
import { fetchQuizes, filterMyQuiz } from "../../utils/apiContentful";
import Footer from "../Footer";
import GitHubCorner from "../GitHubCorner";
import QuizBackground from "../QuizBackground";

function AddQuizSuccess({ quiz }) {
  const {
    query: { quizId },
  } = useRouter();

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
