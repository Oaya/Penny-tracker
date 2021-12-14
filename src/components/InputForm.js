import React from "react";
import PropTypes from "prop-types";

const InputForm = ({
  categories,
  title,
  cost,
  date,
  onHandleAddItem,
  onHandleChange,
}) => {
  return (
    <form className="cost-form" onSubmit={onHandleAddItem}>
      <input
        className="form__input form__input-cost"
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onHandleChange}
      />

      <select
        className="form__input form__input-cost"
        name="category"
        defaultValue={"defalutValue"}
        onChange={onHandleChange}
      >
        <option value="defalutValue" disabled>
          -Choose the category-
        </option>
        {categories &&
          categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
      </select>

      <input
        className="form__input form__input-cost"
        type="number"
        name="cost"
        placeholder="$00.00"
        value={cost}
        min="0"
        onChange={onHandleChange}
      />
      <input
        className="form__input form__input-cost"
        type="date"
        name="date"
        value={date}
        onChange={onHandleChange}
      />
      <button className="btn--blue btn--small ">ADD</button>
    </form>
  );
};
export default InputForm;

InputForm.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onHandleAddItem: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};
