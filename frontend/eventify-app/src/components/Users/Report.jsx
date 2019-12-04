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
    arr:[]
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


  getUserData(){
    let arr=[]
    axios
      .get(
        "http://localhost:5000/users/" + sessionStorage.getItem("email")
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
        let count=0;
            response.data.result.map((currUser, index) => {
                count++;
            });

            if(!arr.length){
                arr = [
                    { label: "Total registered attendees", y: count }
                ];
            }else{
                arr.push({ label: "Total registered attendees", y: count });
            }
            axios
      .get(
        "http://localhost:5000/usersAttended/" + sessionStorage.getItem("email")
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
        let count1=0;
            response.data.result.map((currUser, index) => {
                count1++;
            });
            
            if(!arr.length){
                arr = [
                    { label: "Attendees who came to the event", y: count1}
                ];
            }else{
                arr.push({ label: "Attendees who came to the event", y: count1 });
            }
            this.setState({arr:arr});
    }

      });
    }

      });

      
  }

  componentDidMount() {
    this.getTopFiveStalls();
    this.getTopFiveSpeakers();
    this.getAllVendorData();
    this.getUserData();
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

    const options6 = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Total registered attendees vs attendees who came to the event",
            fontFamily:"Segoe UI"
        },
        axisY: {
        title: "Number of Attendees",
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            labelAngle: 180,		
            indexLabelFontColor: "black",
            dataPoints: this.state.arr
        }]
    }



      if(this.state.stall===false && this.state.timereportstall===false ){
        chartstall= <center><h3>No data available yet</h3></center>

      }else{
      chartstall=  <React.Fragment><div className="flex">
        <div className="col-sm-6">
        <CanvasJSChart options={options2} />
        </div>
        <div className="col-sm-6">
        <CanvasJSChart options={options4} />
        </div>
        </div><br/><br/>
        <div className="col-sm-6 margin-center">
            <CanvasJSChart options={options} /></div>
        </React.Fragment>
        
      }

      if(this.state.timereportspeaker===false && this.state.speaker===false){
        chartspeaker= <center><h3>No data available yet</h3></center>
      }else{
        chartspeaker=<React.Fragment><div className="flex">
        <div className="col-sm-6">
        <CanvasJSChart options={options3} />
        </div>
        <div className="col-sm-6">
        <CanvasJSChart options={options5} />
        </div>
        </div><br/><br/>
        <div className="col-sm-6 margin-center"><CanvasJSChart options={options1} /></div></React.Fragment>

      }

      let chart;
  if(this.state.arr.length===0){
    chart= <center><h3>No data available yet</h3></center>
  }else{
    chart=<div className="col-sm-6 margin-center"><CanvasJSChart options={options6} /></div>

  }

      

    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1 className="header">Reports</h1> <div class="border-div"></div>
        </div>
        <div className="tab-body">
        <center><h1>Vendors</h1></center><hr/><br/>
        {chartstall}<br/><div class="border-div"></div>

        <center><h1>Speakers</h1></center><hr/><br/>
        {chartspeaker}<br/><div class="border-div"></div>
        <center><h1>Attendees</h1></center><hr/><br/>
        {chart}
        {/* {this.state.attendedusercount} */}
        </div>
      </div>
    );
  }
}

export default Report;
