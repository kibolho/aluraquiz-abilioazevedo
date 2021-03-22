import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  fetchQuizes,
  filterMyQuiz,
  getExternalQuizes,
} from "../utils/apiContentful";
import { ThemeProvider } from "styled-components";

import Widget from "../components/Widget";
import Link from "../components/Link";
import QuizLogo from "../components/QuizLogo";
import QuizBackground from "../components/QuizBackground";
import Footer from "../components/Footer";
import GitHubCorner from "../components/GitHubCorner";
import Input from "../components/Input";
import Button from "../components/Button";
import QuizContainer from "@/components/QuizContainer";
import { initializeApollo } from "@/lib/apollo/client";
import QuizesQuery from "../graphql/queries/quizes";

export default function Home({ quiz, quizes }) {
  const router = useRouter();
  const [name, setName] = React.useState("");

  return (
    <ThemeProvider theme={quiz?.theme}>
      <QuizBackground backgroundImage={quiz.bg}>
        <Head>
          <title>AluraQuiz -{quiz.title}</title>
        </Head>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: "0" },
              hidden: { opacity: 0, y: "100%" },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{quiz.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{quiz.description}</p>
              <form
                onSubmit={function (infosDoEvento) {
                  infosDoEvento.preventDefault();
                  router.push(`/quiz?playerName=${name}`);
                }}
              >
                <Input
                  name="nomeDoUsuario"
                  onChange={(infosDoEvento) =>
                    setName(infosDoEvento.target.value)
                  }
                  placeholder="Diz ai seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <form
                onSubmit={function (infosDoEvento) {
                  infosDoEvento.preventDefault();
                  router.push(`/addQuiz`);
                }}
              >
                <h1>Quizes da Galera</h1>

                <ul>
                  {quizes.map((quiz) => {
                    return (
                      <li key={quiz.id}>
                        <Widget.Topic as={Link} href={`/quiz/${quiz.id}`}>
                          {quiz.title}
                        </Widget.Topic>
                      </li>
                    );
                  })}
                </ul>
                <Button type="submit">Adicionar meu Quiz</Button>
              </form>
            </Widget.Content>
          </Widget>
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
  const quizesCobtebtful = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizesCobtebtful);
  const otherQuizes = quizesCobtebtful.filter(
    (item) => item.id !== "6olZW8JSHnZUConzT144BJ"
  );
  const externalQuizes = getExternalQuizes(myQuiz);
  let quizes = [...externalQuizes, ...otherQuizes];
  try {
    const apolloClient = initializeApollo();

    const data = await apolloClient.query({
      query: QuizesQuery,
    });
    console.log("data", data);
    const prismaDBQuizes = data?.data?.listQuizes?.map((item) => {
      return {
        id: `prisma__${item.id}`,
        rawQuiz: null,
        title: item.title,
      };
    });
    quizes = [...quizes, ...prismaDBQuizes];
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      quiz: myQuiz?.rawQuiz,
      quizes,
    },
  };
}
