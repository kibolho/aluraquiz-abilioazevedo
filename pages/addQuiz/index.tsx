import QuizContainer from "@/components/QuizContainer";
import { CreateQuizMutation } from "@/lib/prisma/mutations";
import { useMutation } from "@apollo/react-hooks";
import { motion } from "framer-motion";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import LoadingWidget from "src/screens/Quiz/LoadingWidget";
import { ThemeProvider } from "styled-components";
import * as yup from "yup";
import Footer from "../../src/components/Footer";
import GitHubCorner from "../../src/components/GitHubCorner";
import QuizBackground from "../../src/components/QuizBackground";
import { addApolloState, initializeApollo } from "../../src/lib/apollo/client";
import { fetchQuizes, filterMyQuiz } from "../../src/utils/apiContentful";
import AddQuizForm from "./screen";

const quizFormatError = "O Quiz está no formado errado";
const schemaContent = yup
  .object()
  .typeError(quizFormatError)
  .shape({
    bg: yup.string().required("Falta preencher a imagem de plano de fundo"),
    title: yup.string().required("Falta preencher o título do quiz"),
    description: yup.string(),
    questions: yup
      .array()
      .typeError(quizFormatError)
      .of(
        yup.object().shape({
          image: yup
            .string()
            .required("Falta preencher a image de alguma pergunta"),
          title: yup
            .string()
            .required("Falta preencher o título de alguma pergunta"),
          answer: yup
            .number()
            .required("Falta preencher a resposta de alguma pergunta"),
          alternatives: yup
            .array()
            .of(yup.string())
            .required("Falta preencher as alternativas de uma pergunta"),
        })
      )
      .required("Falta preencher as questões"),
    external: yup.array().of(yup.string()),
    theme: yup
      .object()
      .typeError(quizFormatError)
      .shape({
        colors: yup
          .object()
          .typeError(quizFormatError)
          .shape({
            primary: yup
              .string()
              .required("Falta o campo theme.colors.primary"),
            secondary: yup
              .string()
              .required("Falta o campo theme.colors.secondary"),
            mainBg: yup.string().required("Falta o campo theme.colors.mainBg"),
            contrastText: yup
              .string()
              .required("Falta o campo theme.colors.contrastText"),
            wrong: yup.string().required("Falta o campo theme.colors.wrong"),
            success: yup
              .string()
              .required("Falta o campo theme.colors.success"),
          }),
        borderRadius: yup.string().required("Falta o campo theme.borderRadius"),
      })
      .required("Falta o campo theme"),
  })
  .required("Campo Obrigatório");

function AddQuiz({ quiz }) {
  const [globalError, setGlobalError] = useState("");
  const [createQuiz, { loading, error, data }] = useMutation(
    CreateQuizMutation
  );

  useEffect(() => {
    setGlobalError(error?.message);
  }, [error]);

  useEffect(() => {
    console.log("sucesso data", data);
    if (data?.id) {
      Router.push("/addQuiz/success");
    }
  }, [data]);

  const onSubmit = async ({ title, content, authorEmail, authorName }) => {
    setGlobalError("");
    console.log("onSubmit", { title, content, authorEmail, authorName });
    try {
      const quiz = JSON.parse(content);
      console.log(quiz);

      schemaContent
        .validate(quiz, { abortEarly: false })
        .then(async () => {
          await createQuiz({
            variables: {
              title,
              content,
              authorEmail,
              authorName,
            },
          });
        })
        .catch((err) => {
          console.log(err.errors);
          setGlobalError(err?.errors?.length > 0 ? err.errors[0] : "");
        });
    } catch (e) {
      setGlobalError("O conteúdo do quiz não é um JSON válido");
    }
  };

  return (
    <ThemeProvider theme={quiz?.theme}>
      <QuizBackground backgroundImage={quiz.bg}>
        <Head>
          <title>Crie seu Quiz - AluraQuiz</title>
        </Head>
        <QuizContainer>
          {loading && <LoadingWidget />}
          {!loading && <AddQuizForm onSubmit={onSubmit} error={globalError} />}
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

export default AddQuiz;
