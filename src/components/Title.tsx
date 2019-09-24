import * as React from "react";
import { createPortal } from "react-dom";

const Title: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [, forceUpdate] = React.useState();
  const container = document.querySelector("header > h1");

  React.useLayoutEffect(() => {
    if (!container) forceUpdate(val => !val);
  }, [container ? null : true]);

  return container ? createPortal(children, container) : null;
};

export default Title;
