import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { IncomeContextProvider } from "./contexts/IncomeContext";
import { ExpenseContextProvider } from "./contexts/ExpenseContext";

ReactDOM.render(
  <BrowserRouter basename={window.location.pathname || ""}>
    <AuthContextProvider>
      <IncomeContextProvider>
        <ExpenseContextProvider>
          <App />
        </ExpenseContextProvider>
      </IncomeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
