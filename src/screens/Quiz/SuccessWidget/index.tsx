import BackLinkArrow from "@/components/BackLinkArrow";
import React from "react";
import Widget from "../../../components/Widget";

function SuccessWidget({ children }) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Successo
      </Widget.Header>

      <Widget.Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Widget.Content>
    </Widget>
  );
}

export default SuccessWidget;
