import React from "react";

import { useExpense } from "../contexts/ExpenseContext";
import ItemInput from "./ItemInput";
import TableContent from "./TableContent";
import PieChart from "./PieChart";
import Error from "./Error";

const Expense = () => {
  const { monthlyExpenses, totalExpense, deleteExpense, error } = useExpense();
  const categoryLabels = [
    "Groceries",
    "Housing",
    "Insurance",
    "Socializing",
    "Shopping",
    "Entertainment",
    "Transportation",
    "Other",
  ];
  const backgroundColor = [
    "#4b778d",
    "#28b5b5",
    "#b0efeb",
    "#8fd9a8",
    "#34656d",
    "#81b214",
    "#00917c",
    "#75cfb8",
    "#11698e",
  ];
  const initialData = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div className="card">
      <div className="card__heading-group">
        <div className="card__heading">
          {error && <Error message={error} />}
          <h2>Monthly Expense</h2>
          <h2 className="card__amount">$ {totalExpense}</h2>
          <div className="card__input">
            <ItemInput type="Expense" categories={categoryLabels} />
          </div>
        </div>

        <div className="pie">
          <PieChart
            backgroundColor={backgroundColor}
            categoryLabels={categoryLabels}
            initialData={initialData}
            pieChartData={monthlyExpenses}
          />
        </div>
      </div>
      <TableContent items={monthlyExpenses} deleteItem={deleteExpense} />
    </div>
  );
};
export default Expense;
