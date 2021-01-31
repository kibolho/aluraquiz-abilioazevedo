import { Lottie } from "@crello/react-lottie";
import React from "react";
import Widget from "../../../components/Widget";
import loadingAnimation from "../animations/loading.json";

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content style={{ display: "flex", justifyContent: "center" }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{
            animationData: loadingAnimation,
            loop: true,
            autoplay: true,
          }}
        />
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;