import React from "react";
import TrafficList from "./TrafficList";
import "./app.less";

const App = props => (
  <>
    <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
      Traffic Data
    </h1>
    <TrafficList />
  </>
);

export default App;
