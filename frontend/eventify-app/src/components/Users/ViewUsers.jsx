import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faTimes,
  faCheck,
  faEdit,
  faTrashAlt,
  faChartLine,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

class ViewUsers extends Component {
  state = {
    rfidModal: false,
    rfidNumber: "",
    email: "",
    userList: [
      {
        first_name: "CGADFSA",
        last_name: "CGADFSA",
        phone_num: 123,
        email: "asdasd",
        rfid: 123456
      }
    ]
  };

  updateRfid = e => {
    e.preventDefault();
    let data = {
      rfid_number: this.state.rfidNumber,
      email: this.state.email
    };
    console.log("in update function");
    axios.post("http://localhost:5000/updateRfid", data).then(response => {
      console.log(response.data.message);
      this.setState({ rfidModal: false });
      this.props.onModify();
    });
  };

  render() {
    let table, header;

    if (!this.state.userList.length) header = <p>No registered participants</p>;
    else {
      table = this.state.userList.map((currUser, index) => {
        return (
          <tr key={index}>
            <td>{currUser.first_name}</td>
            <td>{currUser.last_name}</td>
            <td>{currUser.phone_num}</td>
            <td>{currUser.email}</td>
            <td>{currUser.rfid}</td>
            <td>
              <Button
                variant="outline-success"
                onClick={e => {
                  this.setState({
                    rfidModal: true,
                    rfidNumber: currUser.rfid,
                    email: currUser.email
                  });
                }}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                Update
              </Button>
            </td>
          </tr>
        );
      });
      header = (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>RFID Number</th>
              <th>Update RFID</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      );
    }

    return (
      <React.Fragment>
        <div className="tab-content user-profile">
          <h1 className="header">Attendee Information: </h1>
          <div class="border-div"></div>
          <p>Listed are the attendees for your event:</p>
          <div className="tab-body">{header}</div>
        </div>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.rfidModal}
          onHide={e => this.setState({ rfidModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter RFID Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate>
              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  RFID Number
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="number"
                    placeholder="RFID Number"
                    value={this.state.rfidNumber}
                    onChange={e =>
                      this.setState({ rfidNumber: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.updateRfid}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ViewUsers;
