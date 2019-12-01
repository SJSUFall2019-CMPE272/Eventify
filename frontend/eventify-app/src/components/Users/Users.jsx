import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Users.scss";
import AddVendor from "./AddVendor";
import EditVendor from "./EditVendor";
import axios from 'axios';

class Users extends Component {
  state = {
    vendorList:[]
  };


  componentDidMount() {
    
    axios.get("http://localhost:5000/vendor/"+sessionStorage.getItem('email')).then(response => {
      console.log(response.data.result);
      this.setState({ vendorList: response.data.result });
    });
  }

  render() {
    return (
      <div className="userhome-wrapper col-md-12 screen-wrapper">
        <div className="card accordion-container flex">
          <div className="col-sm-4 sidebar">
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Intro!
                </Accordion.Toggle>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Events List
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          <div className="col-sm-8 sidebar-content"><AddVendor /></div><br/>
          <div className="col-sm-8 sidebar-content"><EditVendor vendorList={this.state.vendorList} /></div>
          
        </div>
      </div>
    );
  }
}

export default Users;
