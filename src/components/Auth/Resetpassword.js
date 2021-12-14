import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Error from "../Error";

const Resetpassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState(null);

  async function handlePasswordReset(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    try {
      setError(null);
      await resetPassword(enteredEmail);
    } catch (res) {
      setError(res.message);
    }
  }

  return (
    <div className="form-container">
      <h2 className="heading-secondary">Reset Password</h2>
      {error && <Error message={error} />}
      <form onSubmit={handlePasswordReset}>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input form__input-auth"
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
          <button className="btn btn--blue" type="submit">
            Reset Password
          </button>
        </div>
      </form>
      <div className="form__link-box">
        <Link to="/SignUp" className="form__link-login">
          Do not have an account yet?
        </Link>
      </div>
    </div>
  );
};
export default Resetpassword;
