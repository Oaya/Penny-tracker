import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { IncomeContextProvider } from "./contexts/IncomeContext";
import { ExpenseContextProvider } from "./contexts/ExpenseContext";

ReactDOM.render(
  <AuthContextProvider>
    <IncomeContextProvider>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </IncomeContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
