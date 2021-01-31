import React from "react";
import BackLinkArrow from "../../../components/BackLinkArrow";
import Widget from "../../../components/Widget";

interface ResultWidgetProps {
  playerName: string;
  results: boolean[];
}

function ResultWidget({ playerName = "", results }:ResultWidgetProps) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          {playerName || "Você"} acertou {results.filter((x) => x).length}{" "}
          perguntas:
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #{index + 1} Resultado: {result === true ? "Acertou" : "Errou"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

export default ResultWidget;