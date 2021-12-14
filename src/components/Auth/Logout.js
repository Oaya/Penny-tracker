import React, { useState } from "react";
import { useHistory } from "react-router";
import Error from "../Error";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Logout = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const { logout } = useAuth();

  async function handlelogout() {
    setError(false);
    try {
      await logout();
      console.log("logout");
      history.push("/welcome");
    } catch (res) {
      console.log(res.message);
      setError(res.message);
    }
  }
  return (
    <div>
      {error && <Error message={error} />}
      <NavLink className="button " to="/Welcome" onClick={handlelogout}>
        Logout
      </NavLink>
    </div>
  );
};
export default Logout;
