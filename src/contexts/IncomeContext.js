/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import lastDayOfYear from "date-fns/lastDayOfYear";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
import formatISO from "date-fns/formatISO";

import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const IncomeContext = React.createContext();

function useIncome() {
  return useContext(IncomeContext);
}

const IncomeContextProvider = (props) => {
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const options = { year: "numeric", month: "long" };
  const [month, setMonth] = useState(new Date().toLocaleString("en", options));
  const [date, setDate] = useState(new Date());
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.uid;
  const [allTotalIncomes, setAllTotalIncomes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [barIsLoading, setBarisLoading] = useState(false);
  const [error, setError] = useState(null);
  const representation = { representation: "date" };

  const firstDayOfyear = formatISO(startOfYear(new Date(date)), representation);
  const theLastDayOfyear = formatISO(
    lastDayOfYear(new Date(date)),
    representation
  );
  const firstDayOfMonth = formatISO(
    startOfMonth(new Date(date)),
    representation
  );
  const theLastDayOfMonth = formatISO(
    lastDayOfMonth(new Date(date)),
    representation
  );

  useEffect(() => {
    fetchMonthlyIncomes();
  }, [date, currentUser]);

  useEffect(() => {
    //get total monthly income for current month//
    const incomeCosts = monthlyIncomes.reduce(
      (acc, cur) => acc + Number(cur.cost),
      0
    );
    setTotalIncome(incomeCosts);
  }, [monthlyIncomes]);

  //change to following month//
  function getFollowingMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    setMonth(
      new Date(date.getFullYear(), date.getMonth() + 1).toLocaleString(
        "en",
        options
      )
    );
  }

  //change to previous month//
  function getPrevMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    setMonth(
      new Date(date.getFullYear(), date.getMonth() - 1).toLocaleString(
        "en",
        options
      )
    );
  }

  //patch income data from firestore at the beggining then show in the table//
  async function fetchMonthlyIncomes() {
    if (!currentUserId) {
      return;
    }
    try {
      setIsLoading(true);
      await db
        .collection("incomes")
        .where("uid", "==", currentUserId)
        .orderBy("date")
        .startAt(firstDayOfMonth)
        .endAt(theLastDayOfMonth)
        .get()
        .then((docs) => {
          const monthlyIncomes = [];
          docs.forEach((doc) =>
            monthlyIncomes.push({
              id: doc.id,
              ...doc.data(),
            })
          );

          setMonthlyIncomes(monthlyIncomes);
          setIsLoading(false);
        });
    } catch (res) {
      setError(res.message);
    }
  }
  //add income date to firestore then add to the table//
  function addIncomes(content) {
    const docId = uuidv4();
    const { title, cost, date, category } = content;
    db.collection("incomes").doc(docId).set({
      title,
      cost,
      date,
      category,
      uid: currentUserId,
    });
    fetchMonthlyIncomes();
  }

  //delete income item//
  function deleteIncome(incomeItem) {
    db.collection("incomes").doc(incomeItem.id).delete();
    fetchMonthlyIncomes();
  }

  //get total income for profile//
  async function getTotalIncome() {
    if (!currentUserId) {
      return;
    }
    try {
      await db
        .collection("incomes")
        .where("uid", "==", currentUserId)
        .get()
        .then((docs) => {
          let totalIncome = 0;
          docs.forEach((doc) => (totalIncome += +doc.data().cost));

          setAllTotalIncomes(totalIncome);
        });
    } catch (res) {
      setError(res.message);
    }
  }

  // get data for bar chart//
  async function getAllIncomes() {
    if (!currentUserId) {
      return;
    }
    try {
      setBarisLoading(true);
      await db
        .collection("incomes")
        .where("uid", "==", currentUserId)
        .orderBy("date")
        .startAt(firstDayOfyear)
        .endAt(theLastDayOfyear)
        .get()
        .then((docs) => {
          const allIncomes = [];
          docs.forEach((doc) =>
            allIncomes.push({
              id: doc.id,
              ...doc.data(),
            })
          );

          setAllIncomes(allIncomes);
          setBarisLoading(false);
        });
    } catch (res) {
      setError(res.message);
    }
  }

  const incomeValue = {
    addIncomes,
    deleteIncome,
    getFollowingMonth,
    getPrevMonth,
    getTotalIncome,
    getAllIncomes,
    monthlyIncomes,
    totalIncome,
    allTotalIncomes,
    month,
    date,
    isLoading,
    firstDayOfMonth,
    theLastDayOfMonth,
    theLastDayOfyear,
    firstDayOfyear,
    allIncomes,
    barIsLoading,
    error,
  };
  return (
    <div>
      <IncomeContext.Provider value={incomeValue}>
        {props.children}
      </IncomeContext.Provider>
    </div>
  );
};

export { useIncome, IncomeContextProvider };

IncomeContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
