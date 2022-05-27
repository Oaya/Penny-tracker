/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";

const PieChart = ({
  categories,
  pieChartData,
  categoryLabels,
  initialData,
  backgroundColor,
}) => {
  const [pieChartsData, setPieChartsData] = useState(initialData);
  const pieChart = {
    labels: categoryLabels,
    datasets: [
      {
        data: pieChartsData,
        backgroundColor: backgroundColor,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
      
        labels: {
          usePointStyle: true
        }
      }
    }
  };

  useEffect(() => {
    const category = () => {
      return categoryLabels.map((categoryLabel) => {
        return pieChartData
          .filter((item) => {
            return item.category === categoryLabel;
          })
          .reduce((acc, cur) => {
            return acc + Number(cur.cost);
          }, 0);
      });
    };
    setPieChartsData(category);
  }, [pieChartData]);

  return <Pie data={pieChart} categories={categories}  options={options}/>;
};
export default PieChart;

PieChart.propTypes = {
  pieChartData: PropTypes.array.isRequired,
  categoryLabels: PropTypes.array.isRequired,
  initialData: PropTypes.array.isRequired,
  backgroundColor: PropTypes.array.isRequired,
};
