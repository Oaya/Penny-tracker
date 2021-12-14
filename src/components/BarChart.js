import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { useExpense } from "../contexts/ExpenseContext";
import { useIncome } from "../contexts/IncomeContext";

const BarChart = () => {
  const [expensebarChart, setExpenseBarChart] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [incomebarChart, setIncomeBarChart] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const { barIsLoading: isLoadingIncome, allIncomes } = useIncome();
  const { barIsLoading: isLoadingExpense, allExpenses } = useExpense();
  const monthLabels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const barchart = {
    labels: monthLabels,
    datasets: [
      {
        label: "Income",
        data: incomebarChart,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Expense",
        data: expensebarChart,
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  useEffect(() => {
    if (!isLoadingExpense) {
      fetchBarChart(allExpenses, setExpenseBarChart);
    }
  }, [isLoadingExpense, allExpenses]);

  useEffect(() => {
    if (!isLoadingIncome) {
      fetchBarChart(allIncomes, setIncomeBarChart);
    }
  }, [isLoadingIncome, allIncomes]);

  function fetchBarChart(barItems, setChart) {
    const barChartMonth = () => {
      return monthLabels.map((monthLabel) => {
        return barItems
          .filter((barItem) => {
            return barItem.date.slice(5, 7) === monthLabel;
          })
          .reduce((acc, cur) => {
            return acc + +cur.cost;
          }, 0);
      });
    };
    return setChart(barChartMonth);
  }

  // bar chart//
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${new Date().toISOString().slice(0, 4)}'s incomes & expenses `,
      },
    },
  };

  return <Bar data={barchart} options={options} />;
};
export default BarChart;
