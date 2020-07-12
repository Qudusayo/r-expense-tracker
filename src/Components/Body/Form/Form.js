import React, { Component } from "react";

import "./form.css";
import "../body.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      to: "",
      note: "",
      date: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      amount: this.state.amount,
      to: this.state.to,
      info: this.state.note,
      date: this.state.date,
    };
    this.props.addExpense(data);

    this.setState({ amount: "" });
    this.setState({ to: "" });
    this.setState({ note: "" });
    this.setState({ date: "" });
  };

  render() {
    return (
      <div className="flex_content flex_form">
        <form onSubmit={this.onSubmit} className="form">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            onChange={this.onChange}
            value={this.state.amount}
            autoComplete="off"
            required
          />

          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            onChange={this.onChange}
            value={this.state.to}
            autoComplete="off"
            required
          />

          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            rows="5"
            onChange={this.onChange}
            value={this.state.note}
          ></textarea>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={this.onChange}
            value={this.state.date}
            required
          />

          <button className="btn btn_success" type="submit">
            Add expense
          </button>
          <button
            className="btn btn_danger"
            type="button"
            onClick={this.props.clearExpenses}
          >
            Clear record
          </button>
          <button
            className="btn btn_primary"
            type="button"
            onClick={this.props.getCsv}
          >
            Export as .csv
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
