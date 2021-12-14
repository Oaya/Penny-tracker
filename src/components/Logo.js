import { NavLink } from "react-router-dom";
import piggy from "../img/piggybank.png";
import { useAuth } from "../contexts/AuthContext";

const Logo = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <NavLink className="logo-box" to="/">
          <img src={piggy} alt="logo" className="logo__img" />
          <span className="logo__text">Penny Tracker</span>
        </NavLink>
      ) : (
        <NavLink className="logo-box" to="/welcome">
          <img src={piggy} alt="logo" className="logo__img" />
          <span className="logo__text">Penny Tracker</span>
        </NavLink>
      )}
    </div>
  );
};
export default Logo;
