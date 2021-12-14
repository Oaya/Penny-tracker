import React, { useState } from "react";
import PropTypes from "prop-types";

import { useIncome } from "../contexts/IncomeContext";
import { useExpense } from "../contexts/ExpenseContext";
import InputForm from "./InputForm";

const ItemInput = ({ type, categories }) => {
  const { addIncomes } = useIncome();
  const { addExpenses } = useExpense();
  const [content, setContent] = useState({
    title: "",
    cost: "",
    date: "",
    category: "",
  });

  //change the input field//
  function handleChange(event) {
    const { name, value } = event.target;
    setContent((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //add item in the list//
  function handleAddItem(event) {
    event.preventDefault();
    if (!content.cost) {
      alert("Please Fill Cost Field");
    }
    if (content.date === "") {
      alert("Please Fill Date Field");
    }
    if (type === "Income") {
      addIncomes(content);
    } else if (type === "Expense") {
      addExpenses(content);
    }
    event.target.reset();
    setContent({ title: "", cost: "", date: "", category: "" });
  }

  return (
    <div>
      <p className="paragraph">Add Your New {type}</p>

      <InputForm
        title={content.title}
        cost={content.cost}
        date={content.date}
        categories={categories}
        onHandleChange={handleChange}
        onHandleAddItem={handleAddItem}
      />
    </div>
  );
};
export default ItemInput;

ItemInput.propTypes = {
  type: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};
