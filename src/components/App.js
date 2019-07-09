import React from "react";
import TrafficList from "./TrafficList";
import "./app.less";

const App = () => (
  <>
    <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
      Traffic Volume
    </h1>
    <TrafficList />
  </>
);

export default App;
