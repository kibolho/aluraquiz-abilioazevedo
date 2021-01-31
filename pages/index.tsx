import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  fetchQuizes,
  filterMyQuiz,
  getExternalQuizes,
} from "../src/utils/apiContentful";
import { ThemeProvider } from "styled-components";

import Widget from "../src/components/Widget";
import Link from "../src/components/Link";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Input from "../src/components/Input";
import Button from "../src/components/Button";

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

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
                  router.push(`/quiz?name=${name}`);
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
              <Button type="submit">
                  Adicionar meu Quiz
                </Button>
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
  const quizes = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizes);
  const otherQuizes = quizes.filter(
    (item) => item.id !== "6olZW8JSHnZUConzT144BJ"
  );
  const externalQuizes = getExternalQuizes(myQuiz);
  return {
    props: {
      quiz: myQuiz?.rawQuiz,
      quizes: [...externalQuizes, ...otherQuizes],
    },
  };
}
