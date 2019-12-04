import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class AdminHome extends Component {
  state = {
    successModal: false
  };

  generateReport = e => {
    e.preventDefault();
    console.log("in update function");
    axios.get("http://localhost:5000/createreport").then(response => {
      console.log(response.data);
      this.setState({ successModal: true });
    });
  };

  successClose = () => {
    this.setState({ successModal: false });
  };

  render() {
    return (
      <div className="tab-content">
        <h1 className="header">Admin Home</h1> <div class="border-div"></div>
        <div className="col-sm-12">
          This is the admin page.
          <br />
          You can create or view events here.
          <br />
          In the view events tab, you can view stats for various events
          available.
          <br />
          <br /> Press the button below to generate reports.
          <br />
          <br />
          <br />
          <Button
            variant="outline-success"
            onClick={e => {
              this.generateReport(e);
            }}
          >
            Generate Report
          </Button>
        </div>
        <React.Fragment>
          <Modal
            className="confirm-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.successModal}
            onHide={this.successClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Success!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Report generated successfully!</h5>
              <Button onClick={this.successClose} size="sm" variant="success">
                Ok
              </Button>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default AdminHome;
