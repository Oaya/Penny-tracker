/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useIncome } from "../contexts/IncomeContext";

const ExpenseContext = React.createContext();

function useExpense() {
  return useContext(ExpenseContext);
}

const ExpenseContextProvider = (props) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;
  const [allTotalExpenses, setAllTotalExpenses] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [barIsLoading, setBarisLoading] = useState(false);
  const [error, setError] = useState(null);


  const {
    firstDayOfMonth,
    theLastDayOfMonth,
    theLastDayOfyear,
    firstDayOfyear,
    date,
  } = useIncome();

  //reading data at frist render//
  useEffect(() => {
    fetchMonthlyExpense();
  }, [date, currentUser]);

  useEffect(() => {
    //get total monthly expense for current month//
    const expenseCosts = monthlyExpenses.reduce(
      (acc, cur) => +acc + +cur.cost,
      0
    );
    setTotalExpense(expenseCosts);
  }, [monthlyExpenses]);

  //patch expense data from firestore then show in the table //
  async function fetchMonthlyExpense() {
    if (!currentUserId) {
      return;
    }
    try {
      setIsLoading(true);
      await db
        .collection("expenses")
        .where("uid", "==", currentUserId)
        .orderBy("date")
        .startAt(firstDayOfMonth)
        .endAt(theLastDayOfMonth)
        .get()
        .then((docs) => {
          const monthlyExpenses = [];
          docs.forEach((doc) =>
            monthlyExpenses.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          setMonthlyExpenses(monthlyExpenses);
          setIsLoading(false);
        });
    } catch (res) {
      setError(res.message);
    }
  }

  //add expense date to firestore then add to the table//
  function addExpenses(content) {
    const docId = uuidv4();
    const { title, cost, date, category } = content;
    db.collection("expenses").doc(docId).set({
      title,
      cost,
      date,
      category,
      uid: currentUserId,
    });

    fetchMonthlyExpense();
  }

  //delete expense item//
  function deleteExpense(expenseItem) {
    db.collection("expenses").doc(expenseItem.id).delete();
    fetchMonthlyExpense();
  }

  //get total expense for profile//
  async function getTotalExpense() {
    if (!currentUserId) {
      return;
    }
    try {
      await db
        .collection("expenses")
        .where("uid", "==", currentUserId)
        .get()
        .then((docs) => {
          let totalExpense = 0;
          docs.forEach((doc) => (totalExpense += +doc.data().cost));

          setAllTotalExpenses(totalExpense);
        });
    } catch (res) {
      setError(res.message);
    }
  }
  // get data for bar chart//
  async function getAllExpenses() {
    if (!currentUserId) {
      return;
    }
    try {
      setBarisLoading(true);
      await db
        .collection("expenses")
        .where("uid", "==", currentUserId)
        .orderBy("date")
        .startAt(firstDayOfyear)
        .endAt(theLastDayOfyear)
        .get()
        .then((docs) => {
          const allExpenses = [];
          docs.forEach((doc) =>
            allExpenses.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          setAllExpenses(allExpenses);
          setBarisLoading(false);
        });
    } catch (res) {
      setError(res.message);
    }
  }
  const expenseValue = {
    addExpenses,
    deleteExpense,
    getAllExpenses,
    getTotalExpense,
    monthlyExpenses,
    allTotalExpenses,
    totalExpense,
    allExpenses,
    isLoading,
    barIsLoading,
    error,
  };
  return (
    <div>
      <ExpenseContext.Provider value={expenseValue}>
        {props.children}
      </ExpenseContext.Provider>
    </div>
  );
};

export { useExpense, ExpenseContextProvider };

ExpenseContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
