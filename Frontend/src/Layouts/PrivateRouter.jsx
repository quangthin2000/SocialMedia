import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter(props) {
  return (
    <Route
      render={(routerProps) => {
        let Component = props.component;
        const token = localStorage.getItem("token");
        if (token) return <Component />;
        return <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRouter;
