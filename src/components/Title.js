import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const Title = ({ children }) => {
  const forceUpdate = useState()[1];
  const container = document.querySelector("#root > h1");

  useLayoutEffect(() => {
    if (!container) forceUpdate(val => !val);
  }, [container ? null : true]);

  return container ? createPortal(children, container) : null;
};

export default Title;
