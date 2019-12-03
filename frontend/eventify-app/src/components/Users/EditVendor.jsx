import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./Users.scss";
import {
  faCheck,
  faTimes,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditVendor extends Component {
  state = {
    events: {},
    editModal: false,
    deleteModal: false,
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone_num: "",
    vendor_type: "",
    vendor_desc: "",
    rfid_reader_id: "",
    idSelected: ""
  };

  editModalClose = () => {
    this.setState({ editModal: false });
  };

  editModalShow = event => {
    console.log(event);
    this.setState({
      editModal: true,
      first_name: event.first_name,
      last_name: event.last_name,
      company_name: event.company_name,
      email: event.email,
      phone_num: event.phone_num,
      vendor_type: event.vendor_type,
      vendor_desc: event.vendor_desc,
      rfid_reader_id: event.rfid_reader_id
    });
  };

  deleteClose = () => {
    this.setState({ deleteModal: false });
  };

  deleteOpen = e => {
    this.setState({ deleteModal: true, idSelected: e.target.value });
  };

  onUpdate = e => {
    e.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_num: this.state.phone_num,
      vendor_type: this.state.vendor_type,
      vendor_desc: this.state.vendor_desc,
      rfid_reader_id: this.state.rfid_reader_id,
      company_name: this.state.company_name
    };
    console.log("in update function");
    axios.post("http://localhost:5000/vendor/update", data).then(response => {
      console.log(response.data.message);
      this.editModalClose();
      this.props.onModify();
    });
  };

  onDelete = e => {
    console.log("delete function call");
    let data = {
      email: this.state.idSelected
    };
    axios.post("http://localhost:5000/deleteVendor", data).then(response => {
      console.log(response.data.message);
      this.deleteClose();
      this.props.onModify();
    });
  };

  render() {
    console.log(this.props.vendorList);
    let table, header;

    if (!this.props.vendorList.length) header = <p>No Vendors Found</p>;
    else {
      table = this.props.vendorList.map((currVendor, index) => {
        if (currVendor.type == "Admin") return;

        return (
          <tr key={index}>
            <td>{currVendor.rfid_reader_id}</td>
            <td>{currVendor.first_name}</td>
            <td>{currVendor.company_name}</td>
            <td>{currVendor.email}</td>
            <td>{currVendor.phone_num}</td>
            <td>{currVendor.vendor_type}</td>
            <td>{currVendor.vendor_desc}</td>
            <td>
              <Button
                variant="primary"
                onClick={e => this.editModalShow(currVendor)}
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                value={currVendor.email}
                onClick={e => this.deleteOpen(e)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Delete
              </Button>
            </td>
          </tr>
        );
      });
      header = (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>RFID Reader ID</th>
              <th>First Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone no</th>
              <th>Vendor Type</th>
              <th>Vendor Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      );
    }

    return (
      <React.Fragment>
        <div className="tab-content">
          <div className="tab-header">
            <h1 className="header">Vendors</h1> <div class="border-div"></div>
            <p>
              A list of vendors that were added previously can be found here.
            </p>
          </div>
          <div className="tab-body">{header}</div>
        </div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.editModal}
          onHide={this.editModalClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Edit the details of the selected event</p>
            <Form
              noValidate
              validated={this.state.validated}
              // onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  First name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    value={this.state.first_name}
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter first name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Last name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    value={this.state.last_name}
                    onChange={e => this.setState({ last_name: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter last name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Company name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company name"
                    value={this.state.company_name}
                    onChange={e =>
                      this.setState({ company_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter company name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Email Address
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.email}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Phone Number
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Phone Number"
                    value={this.state.phone_num}
                    onChange={e => this.setState({ phone_num: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter phone number
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Vendor Type
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Vendor Type"
                    value={this.state.vendor_type}
                    onChange={e =>
                      this.setState({ vendor_type: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter vendor type
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Vendor Description
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Vendor Description"
                    rows="3"
                    value={this.state.vendor_desc}
                    onChange={e =>
                      this.setState({ vendor_desc: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Vendor Description
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  RFID Reader ID
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="RFID Reader ID"
                    value={this.state.rfid_reader_id}
                    onChange={e =>
                      this.setState({ rfid_reader_id: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter RFID Reader ID
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.onUpdate(e)}>Update</Button>
          </Modal.Footer>
        </Modal>

        <Modal centered show={this.state.deleteModal} onHide={this.deleteClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Delete Vendor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete the vendor?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onDelete} variant="danger" size="sm">
              <FontAwesomeIcon icon={faCheck} />
              Yes
            </Button>
            <Button onClick={this.deleteClose} size="sm">
              <FontAwesomeIcon icon={faTimes} />
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditVendor;
