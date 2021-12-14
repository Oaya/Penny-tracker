/* eslint-disable react/prop-types */
import React from "react";
import { Route } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Login from "./Login";

const PrivateRoute = ({ component, ...rest }) => {
  const { currentUser } = useAuth();

  const renderingComponent = currentUser ? component : Login;
  return <Route {...rest} component={renderingComponent} />;
};

export default PrivateRoute;
