import React from "react";

import './content.css'
import '../body.css'

function Content(props) {
  return (
    <div className="flex_content flex_expenses">
      <h2 className="head">Expenses</h2>
      <div className="total">
        <h3>TOTAL</h3>
        {props.total ? <h3>${props.total}</h3> : <h3>$0.0</h3>}
      </div>
      {props.expenses.map((expense, index) => {
        return (
          <div className="expense" key={index}>
            <p className="to">
              <b>To:</b> {expense.to}
            </p>
            <p className="date">
              <b>Date:</b> {expense.date}
            </p>
            <p className="amnt">
              <b>Amount:</b> ${expense.amount}
            </p>
            <p className="note">
              <b>Note:</b> {expense.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Content;
