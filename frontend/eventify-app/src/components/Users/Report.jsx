import React, { Component } from "react";
import * as CanvasJSReact from "../canvasjs.react/canvasjs.react";
import { CanvasJSChart } from "../canvasjs.react/canvasjs.react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";

class Report extends Component {
  state = {
    report: [],
    topten: []
  };

  getTopTenCount() {
    axios
      .get(
        "http://localhost:5000/report/topten/" + sessionStorage.getItem("email")
      )
      .then(response => {
        console.log(response.data.result);
        this.setState({ report: response.data.result });

        let b = [];
        let i = 0;
        this.state.report.map((currVendor, index) => {
          console.log(currVendor.visitors.length);
          console.log(currVendor.company_name);
          if (!b.length) {
            b = [
              { y: currVendor.visitors.length, label: currVendor.company_name }
            ];
            i++;
          } else {
            b.push({ y: currVendor.visitors.length, label: currVendor.company_name });
            i++;
          }
        });
        this.setState({ topten: b });
        console.log("sdfdfsdfsdfsdfsdf"+this.state.topten);

      });
  }

  getTopTenTime() {}

  componentDidMount() {
    this.getTopTenCount();
    this.getTopTenTime();
  }

  render() {
    let table, header;
    // if (!this.state.report.length) header = <p>No Reports Found</p>;
    // else {this.state.report.map((currVendor, index) => {
    //     console.log(currVendor.visitors.length);
    // }
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Top Ten Vendors"
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}",
          startAngle: -90,
          dataPoints: this.state.topten
        }
      ]
    };

    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1 className="header">Reports</h1> <div class="border-div"></div>
          <p>Here you can view graphs and reports.</p>
        </div>
        <div className="tab-body"></div>
        <div className="col-sm-6">
          <CanvasJSChart options={options} />
        </div>
      </div>
    );
  }
}

export default Report;
