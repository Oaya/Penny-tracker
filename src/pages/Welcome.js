import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <div className="welcome landing">
      <Logo />

      <div className="welcome__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Penny tracker</span>
          <span className="heading-primary--sub">
            Where you start saving your money
          </span>
        </h1>
        <div className="welcome__button-box">
          <NavLink className="btn btn--white btn--animated-left" to="/Login">
            To Login Page
          </NavLink>
          <NavLink className="btn btn--white btn--animated-right" to="/Signup">
            Make An Account
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
