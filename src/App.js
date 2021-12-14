import React from "react";
import { Route, Switch } from "react-router-dom";

import "./sass/main.scss";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact comp={Home}></PrivateRoute>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/ResetPassword">
        <ResetPassword />
      </Route>
      <Route path="/Profile">
        <Profile />
      </Route>
    </Switch>
  );
};
export default App;
