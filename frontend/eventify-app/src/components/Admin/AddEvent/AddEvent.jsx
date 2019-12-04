import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

class AddEvent extends Component {
  state = {
    validated: false,
    event_date_from: new Date(),
    event_date_to: new Date(),
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_num: "",
    event_name: "",
    event_desc: "",
    event_location: "",
    auth: false,
    successModal: false
  };

  onRegister = e => {
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      this.state.event_date_to < this.state.event_date_from
    ) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
      return;
    }
    e.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      phone_num: this.state.phone_num,
      event_name: this.state.event_name,
      event_desc: this.state.event_desc,
      event_date_from: this.state.event_date_from,
      event_date_to: this.state.event_date_to,
      event_location: this.state.event_location
    };
    axios.post("http://localhost:5000/addEvent", data).then(response => {
      console.log(response.data.message);
      if (response.data.auth === true) {
        this.setState({ successModal: true });
        this.resetForm();
        this.props.onModify();
      }
    });
  };

  resetForm() {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_num: "",
      event_name: "",
      event_desc: "",
      event_location: "",
      validated: false
    });
  }

  successClose = () => {
    this.setState({ successModal: false });
  };

  handleChange = date => {
    this.setState({
      event_date_from: date
    });
  };

  handleChange1 = date => {
    this.setState({
      event_date_to: date
    });
  };

  render() {
    const CustomInput = ({ value, onClick }) => (
      <input
        type="text"
        className="form-control"
        onClick={onClick}
        value={value}
        readOnly
      />
    );

    return (
      <React.Fragment>
        <div className="tab-content">
          <div className="tab-header">
            <h1 className="header">Add Event</h1> <div class="border-div"></div>
            <p>
              Here you can add a new event and specify details about the same.
            </p>
          </div>
          <div className="tab-body">
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={e => this.onRegister(e)}
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
                  Email Address
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter email address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Password
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Password.
                  </Form.Control.Feedback>
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
                  Event Name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Event Name"
                    value={this.state.event_name}
                    onChange={e =>
                      this.setState({ event_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Event Name
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Event Description
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Event Description"
                    rows="3"
                    value={this.state.event_desc}
                    onChange={e =>
                      this.setState({ event_desc: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Event Description
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Date From
                </Form.Label>

                <Col sm={8}>
                  <DatePicker
                    selected={this.state.event_date_from}
                    onChange={this.handleChange}
                    customInput={<CustomInput />}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Date To
                </Form.Label>

                <Col sm={8}>
                  <DatePicker
                    selected={this.state.event_date_to}
                    onChange={this.handleChange1}
                    customInput={<CustomInput />}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column md={4}>
                  Location
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Location"
                    value={this.state.event_location}
                    onChange={e =>
                      this.setState({ event_location: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter location
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          </div>
        </div>
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
            <h5>Event added successfully!</h5>
            <Button onClick={this.successClose} size="sm" variant="success">
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddEvent;
