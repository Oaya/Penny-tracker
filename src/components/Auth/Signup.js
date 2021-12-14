import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Error from "../Error";

const Signup = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpassRef = useRef();
  const { signup, getUserName } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(null);

  async function handleSignUp(event) {
    event.preventDefault();
    const enteredName = userNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enterdConfirmPass = confirmpassRef.current.value;

    if (enteredPassword !== enterdConfirmPass) {
      return setError("passwords don't match");
    }
    try {
      setError(null);
      await signup(enteredEmail, enteredPassword);
      getUserName(enteredName);
      history.push("/");
    } catch (res) {
      setError(res.message);
    }
  }

  return (
    <div className="form-container">
      <h2 className="heading-secondary">Sign up</h2>
      {error && <Error message={error} />}
      <form onSubmit={handleSignUp}>
        <div className="form__group">
          <label className="form__label" htmlFor="username">
            User Name
          </label>
          <input
            className="form__input  form__input-auth"
            required
            id="username"
            ref={userNameRef}
            name="username"
            label="User name"
            type="text"
            autoComplete="username"
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input  form__input-auth"
            required
            id="email"
            ref={emailRef}
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>

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
          <label className="form__label" htmlFor="cofirmpass">
            Confirm Password
          </label>

          <input
            className="form__input form__input-auth"
            required
            id="confirmpass"
            ref={confirmpassRef}
            name="confirmPassword"
            type="password"
            minLength="6"
            data-ng-pattern="/^\S*$/"
            autoComplete="confirm-password"
          />
        </div>

        <div className="form__group">
          <button className="btn btn--blue" type="submit">
            SIGN UP
          </button>
        </div>
      </form>

      <div className="form__link-box">
        <Link to="/Login" className="form__link-login">
          Already have your account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
