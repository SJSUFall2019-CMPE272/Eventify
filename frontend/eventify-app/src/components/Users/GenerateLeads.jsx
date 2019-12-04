import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import axios from 'axios';

class GenerateLeads extends Component {
  constructor(props) {
    super(props);
    this.state = { readerNum: null, showDownload: false, headers: [], data: [] }
  }
  generateLead = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/getlead/` + this.state.readerNum).then(response => {
      console.log(JSON.stringify(response.data.result));
      let resp = response.data.result;
      let headers = [
        { label: 'card_number', key: 'card_number' },
        { label: 'first_name', key: 'first_name' },
        { label: 'email', key: 'email' },
        { label: 'total_time', key: 'total_time' }
      ];
      this.setState({ data: response.data.result, headers: headers, showDownload: true })
    });
  }
  render() {
    let downloadLead = null;
    if (this.state.showDownload) {
      downloadLead = (<CSVLink data={this.state.data} headers={this.state.headers}>
        Download Lead Report
              </CSVLink>)
    }
    return (
      <React.Fragment>
        <div className="tab-content">
          <div className="tab-header">
            <h1 className="header">Generate Leads</h1>
            <div class="border-div"></div>
            <div class="body-container">
              <Form onClick={this.generateLead}>
                <Form.Group controlId="formvendonreader">
                  <Form.Label>RFID Reader Number</Form.Label>
                  <Form.Control type="text" placeholder="Reader number eg. 1, 2" onChange={e => { this.setState({ readerNum: e.target.value }) }} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Generate Lead
                </Button>

              </Form>
              <div class="download-lead-container">{downloadLead}</div>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default GenerateLeads;
