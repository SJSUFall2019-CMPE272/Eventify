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
    timestall:[],
    timespeaker:[],
    timereportspeaker:false,
    timereportstall:false,
    speaker:false,
    stall:false,
    countc:[],
    countd:[],
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


  getAllVendorData() {
    axios
      .get(
        "http://localhost:5000/report/" + sessionStorage.getItem("email")
      )
      .then(response => {
        console.log("all dataaaaaaaaaaaa"+response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
            let c=[],d=[],e=[],f=[];
            response.data.result.map((currObject, index) => {
                if(currObject.vendor_type==="Stall"){
                    this.setState({ timereportstall: true });
                    let sum=0, countc=0;
                    console.log("visitors",currObject.visitors);
                    currObject.visitors.map((vis, index) => {
                        sum+=vis.total_time;
                        countc++;
                    });
                    sum=Math.ceil(sum);
                    if(!c.length){
                        c = [
                            { label: currObject.company_name, y: sum }
                        ];
                    }else{
                        c.push({ label: currObject.company_name, y: sum });
                    }
                    if(!e.length){
                        e = [
                            { label: currObject.company_name, y: sum/countc }
                        ];
                    }else{
                        e.push({ label: currObject.company_name, y: sum/countc });
                    }
                }
                else if(currObject.vendor_type==="Speaker"){
                    this.setState({ timereportspeaker: true });
                    let sum=0, countd=0;
                    currObject.visitors.map((vis, index) => {
                        sum+=vis.total_time;
                        countd++;
                    });
                    sum=Math.ceil(sum);
                    if(!d.length){
                        d = [
                            { label: currObject.company_name, y: sum }
                        ];
                    }else{
                        d.push({ label: currObject.company_name, y: sum });
                    }
                    if(!f.length){
                        f = [
                            { label: currObject.company_name, y: sum/countd }
                        ];
                    }else{
                        f.push({ label: currObject.company_name, y: sum/countd });
                    }
                }
            });
            this.setState({ timestall: c });
            this.setState({ countc: e });
            this.setState({ countd: f });
            this.setState({ timespeaker: d });
    }

      });
  }


  componentDidMount() {
    this.getTopFiveStalls();
    this.getTopFiveSpeakers();
    this.getAllVendorData();
  }

  render() {
    let table, header;
    // if (!this.state.report.length) header = <p>No Reports Found</p>;
    // else {this.state.report.map((currVendor, index) => {
    //     console.log(currVendor.visitors.length);
    // }
    let chartstall,chartspeaker,timestall, timespeaker;
    const options = {
      animationEnabled: true,
      exportEnabled: false,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Top Five Stalls",
        fontFamily:"Segoe UI"
      },subtitles:[
        {
            text: "Number of attendees",
            fontSize: 15,
            fontFamily:"Segoe UI"
        }
        ],
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
          text: "Top Five Speakers",
          fontFamily:"Segoe UI"
        },
        subtitles:[
            {
                text: "Number of attendees",
                fontSize: 15,
                fontFamily:"Segoe UI"
            }
            ],
        data: [
          {
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: this.state.toptenspeakers
          }
        ]
      };

      const options2 = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Total time spent by attendees at each vendor's stall",
            fontFamily:"Segoe UI"
        },
        axisY: {
        title: "Time (in min)",
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            labelAngle: 180,		
            indexLabelFontColor: "black",
            dataPoints: this.state.timestall
        }]
    }

    const options3 = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Total time spent by attendees at each speaker's presentation",
            fontFamily:"Segoe UI"
        },
        axisY: {
        title: "Time (in min)",
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            labelAngle: 180,		
            indexLabelFontColor: "black",
            dataPoints: this.state.timespeaker
        }]
    }

    const options4 = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Average time spent by attendees at each vendor's stall",
            fontFamily:"Segoe UI"
        },
        axisY: {
        title: "Time (in min)",
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            labelAngle: 180,		
            indexLabelFontColor: "black",
            dataPoints: this.state.countc
        }]
    }

    const options5 = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Average time spent by attendees at each speaker's presentation",
            fontFamily:"Segoe UI"
        },
        axisY: {
        title: "Time (in min)",
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            labelAngle: 180,		
            indexLabelFontColor: "black",
            dataPoints: this.state.countd
        }]
    }



      if(this.state.stall===false && this.state.timereportstall===false ){
        chartstall= <center><h3>No data available yet</h3></center>

      }else{
      chartstall=  <React.Fragment><div className="flex">
        <div className="col-sm-6">
        <CanvasJSChart options={options} />
        </div>
        <div className="col-sm-6">
        <CanvasJSChart options={options2} />
        </div>
        </div><br/><br/>
        <div className="col-sm-6 margin-center"><CanvasJSChart options={options4} /></div>
        </React.Fragment>
        
      }

      if(this.state.timereportspeaker===false && this.state.speaker===false){
        chartspeaker= <center><h3>No data available yet</h3></center>
      }else{
        chartspeaker=<React.Fragment><div className="flex">
        <div className="col-sm-6">
        <CanvasJSChart options={options1} />
        </div>
        <div className="col-sm-6">
        <CanvasJSChart options={options3} />
        </div>
        </div><br/><br/>
        <div className="col-sm-6 margin-center"><CanvasJSChart options={options5} /></div></React.Fragment>

      }

      

    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1 className="header">Reports</h1> <div class="border-div"></div>
          <p>Here you can view graphs and reports.</p>
        </div>
        <div className="tab-body"><hr/>
        <center><h1>Vendors</h1></center><hr/><br/>
        {chartstall}<br/><hr/>

        <center><h1>Speakers</h1></center><hr/><br/>
        {chartspeaker}
        </div>
      </div>
    );
  }
}

export default Report;
