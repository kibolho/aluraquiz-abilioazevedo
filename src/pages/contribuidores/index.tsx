import React from "react";
import fs from "fs";
import Widget from "../../components/Widget";
import QuizLogo from "../../components/QuizLogo";
import QuizBackground from "../../components/QuizBackground";
import Footer from "../../components/Footer";
import GitHubCorner from "../../components/GitHubCorner";
import { fetchQuizes, filterMyQuiz } from "src/utils/apiContentful";
import { addApolloState, initializeApollo } from "@/lib/apollo/client";
import { ThemeProvider } from "styled-components";
import QuizContainer from "@/components/QuizContainer";
import Image from "@/components/Image";

export default function ContributorsPage({ contributors, quiz }) {
  return (
    <ThemeProvider theme={quiz.theme}>
      <QuizBackground backgroundImage="https://www.alura.com.br/assets/img/imersoes/react-2/fundo-do-mar-imersao-react-2-01.1609262503.svg">
        <QuizContainer
          style={{ margin: "auto", padding: "5%", maxWidth: "1400px" }}
        >
          <QuizLogo />
          <Widget
            style={{
              maxWidth: "350px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Widget.Header style={{ justifyContent: "center" }}>
              <h1 style={{ fontSize: "25px" }}>Galeria de Projetos</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Estamos muito felizes de contar com a sua participação, confira
                todos os outros projetos criados durante essa imersão!
              </p>
            </Widget.Content>
          </Widget>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gridGap: "1em",
            }}
          >
            {contributors.map(({ user, projectUrl }, indice) => (
              <Widget key={indice} style={{ maxWidth: "400px" }}>
                <Widget.Header style={{ alignItems: "center" }}>
                  <img
                    width="25"
                    height="25"
                    src={`https://github.com/${user}.png`}
                    style={{ marginRight: "15px", borderRadius: "100%" }}
                  />
                  <h2>
                    <a
                      href={`https://github.com/${user}`}
                      style={{ color: "inherit" }}
                    >
                      @{user}
                    </a>
                  </h2>
                </Widget.Header>
                <Widget.Content style={{ padding: 0 }}>
                  <Image src={projectUrl} />
                </Widget.Content>
              </Widget>
            ))}
          </div>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/kibolho" />
      </QuizBackground>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const contributors = fs.readdirSync("./contributors").map((fileName) => {
    const [user, projectUrl] = fs
      .readFileSync(`./contributors/${fileName}`, { encoding: "utf-8" })
      .split("\n");

    return {
      user,
      projectUrl,
    };
  });

  const quizes = await fetchQuizes();
  const myQuiz = filterMyQuiz(quizes);

  const apolloClient = initializeApollo();

  return addApolloState(apolloClient, {
    props: {
      contributors,
      quiz: myQuiz?.rawQuiz,
    },
    revalidate: 1,
  });
}
