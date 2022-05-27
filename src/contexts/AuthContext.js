import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { auth } from "../firebase";

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUserName] = useState("Guest");
  const [showProfile, setShowProfile] = useState(true);

  function getUserName(username) {
    setUserName(username);
    return auth.currentUser.updateProfile({
      displayName: username,
    });
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setUserName("Guest");
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setUserName(auth.currentUser.displayName);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const authValue = {
    currentUser,
    username,
    getUserName,
    signup,
    login,
    logout,
    resetPassword,
    showProfile,
    setShowProfile
  };
  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider };

AuthContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
