import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import Error from "./Error";
import Logo from "./Logo";

const Header = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    setError(false);
    try {
      await logout();
      history.push("/welcome");
    } catch (res) {
      setError(res.message);
    }
  }

  return (
    <header className="header">
      <Logo />

      <div className="header__navigation">
        {error && <Error message={error} />}

        {currentUser && (
          <NavLink className="btn--nav" to="/Profile">
            Profile
          </NavLink>
        )}
        {currentUser && (
          <NavLink className="btn--nav" to="/Welcome" onClick={handleLogout}>
            Logout
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
