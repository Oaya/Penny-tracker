/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/welcome" />
        );
      }}
    />
  );
};

export default PrivateRoute;
