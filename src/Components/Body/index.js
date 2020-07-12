import React, { Component } from "react";

import Content from "./Content/Content";
import Form from "./Form/Form";

import "./body.css";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      expenses: [],
    };
  }

  getTotal = () => {
    let db = JSON.parse(localStorage.getItem("q-react-expenses"));
    let initialTotal = 0;
    db.forEach((data) => {
      initialTotal += Math.abs(data.amount);
    });
    this.setState({ total: initialTotal });
  };

  addExpense = (data) => {
    let newExpense = [...this.state.expenses, data];
    this.setState({ expenses: newExpense });
    localStorage.setItem("q-react-expenses", JSON.stringify(newExpense));
    this.getTotal();
  };

  clearExpenses = () => {
    this.setState({ expenses: [] });
    this.setState({ total: 0 });
    localStorage.setItem("q-react-expenses", JSON.stringify([]));
  };

  getCsv = () => {
    const headers = {
      amount: "Amount",
      to: "For",
      info: "Info",
      date: "Date",
    };

    let itemsNotFormatted = JSON.parse(localStorage.getItem("q-react-expenses"));

    let itemsFormatted = [];

    // format the data
    itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
        amount: item.amount, // remove commas to avoid errors,
        to: item.to,
        info: item.info,
        date: item.date,
      });
    });

    const fileTitle = "Expenses"; // or 'my-unique-title'

    this.exportCSVFile(headers, itemsFormatted, fileTitle);
  };
  convertToCSV = (objArray) => {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  };
  exportCSVFile = (headers, items, fileTitle) => {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + ".csv" || "export.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  componentDidMount() {
    if (localStorage.getItem("q-react-expenses")) {
      this.setState({
        expenses: JSON.parse(localStorage.getItem("q-react-expenses")),
      });
    } else {
      localStorage.setItem("q-react-expenses", JSON.stringify([]));
    }
    this.getTotal();
  }

  render() {
    return (
      <div className="flex">
        <Form clearExpenses={this.clearExpenses} addExpense={this.addExpense} getCsv={this.getCsv } />
        <Content expenses={this.state.expenses} total={this.state.total} />
      </div>
    );
  }
}

export default index;
