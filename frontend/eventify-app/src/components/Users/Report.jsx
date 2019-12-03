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
    topten: [],
    toptenspeakers:[],
    speaker:false,
    stall:false
  };

  getTopFiveStalls() {
    axios
      .get(
        "http://localhost:5000/report/topten/" + sessionStorage.getItem("email")
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
            this.setState({ report: response.data.result });
            this.setState({ stall: true });
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
    }

      });
  }

  getTopFiveSpeakers() {
    axios
    .get(
      "http://localhost:5000/report/toptenspeakers/" + sessionStorage.getItem("email")
    )
    .then(response => {
      console.log(response.data.result);
      if(response.data.result.length===0){
      }
      else{
      this.setState({ report: response.data.result });
      this.setState({ speaker: true });

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
      this.setState({ toptenspeakers: b });
      console.log("sdfdfsdfsdfsdfsdf"+this.state.toptenspeakers);
    }
    });
    
  }

  componentDidMount() {
    this.getTopFiveStalls();
    this.getTopFiveSpeakers();
  }

  render() {
    let table, header;
    // if (!this.state.report.length) header = <p>No Reports Found</p>;
    // else {this.state.report.map((currVendor, index) => {
    //     console.log(currVendor.visitors.length);
    // }
    let chartstall,chartspeaker;
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Top Five Stalls"
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
    const options1 = {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light1", // "light1", "dark1", "dark2"
        title: {
          text: "Top Five Speakers"
        },
        data: [
          {
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: this.state.toptenspeakers
          }
        ]
      };

      if(this.state.stall===false && this.state.speaker===false){
        chartspeaker= <h3></h3>
        chartstall= <h3>No data available yet</h3>
      }else if(this.state.stall===true && this.state.speaker===false){
        chartstall= <CanvasJSChart options={options} />
        chartspeaker= <h3></h3>
      }else if(this.state.stall===false && this.state.speaker===true){
        chartspeaker= <CanvasJSChart options={options1} />
        chartstall= <h3></h3>
      }else{
        chartstall= <CanvasJSChart options={options} />
        chartspeaker= <CanvasJSChart options={options1} />
      }

    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1 className="header">Reports</h1> <div class="border-div"></div>
          <p>Here you can view graphs and reports.</p>
        </div>
        <div className="tab-body"></div>
        <div className="flex">
            <div className="col-sm-6">
          {chartstall}
        </div>
        <div className="col-sm-6">
          {chartspeaker}
        </div>
        </div>
      </div>
    );
  }
}

export default Report;
