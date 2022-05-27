import React from "react";

import Income from "../components/Income";
import Expense from "../components/Expense";
import { useAuth } from "../contexts/AuthContext";
import Total from "../components/Total";
import Header from "../components/Header";

const Home = () => {
  const { username,setShowProfile } = useAuth();
  setShowProfile(true);

  return (
    <div>
      <Header />
      <main className="main">
        <h1 className="username">Hello {username}</h1>
        <Total />
        <Income />
        <Expense />
      </main>
    </div>
  );
};
export default Home;
