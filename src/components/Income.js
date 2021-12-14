import React from "react";

import { useIncome } from "../contexts/IncomeContext";
import ItemInput from "./ItemInput";
import TableContent from "./TableContent";
import PieChart from "./PieChart";
import Error from "./Error";

const Income = () => {
  const { monthlyIncomes, totalIncome, deleteIncome, error } = useIncome();
  const categoryLabels = ["Salary", "Bonus", "Investment", "Other"];
  const backgroundColor = ["#99154e", "#ff577f", "#ffbbcc", "#ff005c"];
  const initialData = [0, 0, 0, 0];

  return (
    <div className="card">
      <div className="card__heading-group">
        <div className="card__heading">
          {error && <Error message={error} />}
          <h2> Monthly Income </h2>
          <h2 className="card__amount"> $ {totalIncome} </h2>
          <div className="card__input">
            <ItemInput type="Income" categories={categoryLabels} />
          </div>
        </div>

        <div className="pie">
          <PieChart
            backgroundColor={backgroundColor}
            categoryLabels={categoryLabels}
            initialData={initialData}
            pieChartData={monthlyIncomes}
          />
        </div>
      </div>

      <TableContent items={monthlyIncomes} deleteItem={deleteIncome} />
    </div>
  );
};

export default Income;
