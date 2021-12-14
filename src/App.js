import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

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
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={LogIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="/Profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
