import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Error from "../Error";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    try {
      setError(null);
      await login(enteredEmail, enteredPassword);
      history.push("/");
    } catch (res) {
      setError(res.message);
    }
  }

  return (
    <div className="form-container">
      <h2 className="heading-secondary">Log In</h2>
      {error && <Error message={error} />}
      <form onSubmit={handleLogin}>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email Adress
          </label>
          <input
            className="form__input form__input-auth"
            required
            id="email"
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="username"
          />
        </div>

        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input form__input-auth"
            required
            id="password"
            ref={passwordRef}
            name="password"
            type="password"
            minLength="6"
            data-ng-pattern="/^\S*$/"
            autoComplete="current-password"
          />
        </div>
        <div className="form__group">
          <button className="btn btn--blue" type="submit">
            LOG IN
          </button>
        </div>
      </form>

      <div className="form__link-box">
        <Link to="/SignUp" className="form__link-login">
          Do not have an account yet?
        </Link>
        <Link to="/ResetPassword" className="form__link-password">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
