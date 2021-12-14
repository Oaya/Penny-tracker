/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useExpense } from "../contexts/ExpenseContext";
import { useIncome } from "../contexts/IncomeContext";
import Navigation from "../components/Header";
import BarChart from "../components/BarChart";

function Profile() {
  const { username, currentUser } = useAuth();
  const { allTotalIncomes, getTotalIncome, getAllIncomes } = useIncome();
  const { allTotalExpenses, getAllExpenses, getTotalExpense } = useExpense();

  useEffect(() => {
    getAllExpenses();
    getTotalExpense();
    getTotalIncome();
    getAllIncomes();
  }, [currentUser]);

  //get asset //
  const allTotalBalance = allTotalIncomes - allTotalExpenses;

  return (
    <div>
      <Navigation />
      <div className="profile">
        <div className="profile__user-box">
          <h1 className="profile__heading">{username}</h1>
          <div className="profile__content">
            <p> Balance</p>
            <h2>${allTotalBalance}</h2>
          </div>
          <div className="profile__content">
            <p> Total Income</p>
            <h2>${allTotalIncomes}</h2>
          </div>
          <div className="profile__content">
            <p> Total Expense</p>
            <h2>${allTotalExpenses}</h2>
          </div>
        </div>

        <div className="bar-chart">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
export default Profile;
