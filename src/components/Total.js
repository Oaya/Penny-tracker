import React, { useState, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { useIncome } from "../contexts/IncomeContext";
import { useExpense } from "../contexts/ExpenseContext";

const Total = () => {
  const [balance, setBalance] = useState(0);
  const stylingTotal = { color: "red" };
  const { totalIncome, getFollowingMonth, getPrevMonth, month, isLoading } =
    useIncome();
  const { totalExpense, isLoading: isLoadingExpense } = useExpense();

  useEffect(() => {
    if (!isLoading && !isLoadingExpense) {
      setBalance(totalIncome - totalExpense);
    }
  }, [totalIncome, totalExpense, isLoading, isLoadingExpense]);

  return (
    <div className="total">
      <div className="total__box-side total__box-right" onClick={getPrevMonth}>
        <p className="total__text">Last month</p>
        <ArrowLeftIcon style={{ fontSize: 40 }} className="total__icon" />
      </div>

      <div className="total__box-center ">
        <h2 className="total__heading-main">{month}</h2>
        <h3 className="total__heading-sub">Your Monthly balance </h3>
        <h2 style={balance < 0 ? stylingTotal : null}> $ {balance} </h2>
      </div>

      <div
        className="total__box-side total__box-left"
        onClick={getFollowingMonth}
      >
        <p className="total__text">Next month</p>
        <ArrowRightIcon style={{ fontSize: 40 }} className="total__icon" />
      </div>
    </div>
  );
};
export default Total;
