import React from "react";
import QuizBackground from "../../components/QuizBackground";
import QuizContainer from "../../components/QuizContainer";
import QuizLogo from "../../components/QuizLogo";
import LoadingWidget from "./LoadingWidget";
import QuestionWidget, {Question} from "./QuestionWidget";
import ResultWidget from "./ResultWidget";

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

interface QuizPageProps {
  playerName?: String;
  externalQuestions: Question[];
  externalBg: String;
}
export default function QuizPage({
  playerName = "",
  externalQuestions,
  externalBg,
}:QuizPageProps) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget playerName={String(playerName)} results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
