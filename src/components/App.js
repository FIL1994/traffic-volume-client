import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TrafficList from "./TrafficList";
import "./app.less";
import Traffic from "./Traffic";

const App = () => (
  <>
    <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
      Traffic Volume
    </h1>
    <Router>
      <Route exact path="/" component={TrafficList} />
      <Route path="/:id" component={Traffic} />
    </Router>
  </>
);

export default App;
