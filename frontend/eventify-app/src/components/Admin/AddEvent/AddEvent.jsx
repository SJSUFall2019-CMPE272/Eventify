import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddEvent extends Component {
  state = {
    validated: false,
    startDate: new Date()
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const CustomInput = ({ value, onClick }) => (
      <input
        type="text"
        className="form-control"
        onClick={onClick}
        value={value}
      />
    );

    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1>Add Event</h1>
          <p>
            Here you can add a new event and specify details about the same.
          </p>
        </div>
        <div className="tab-body">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Group as={Row}>
              <Form.Label column md={4}>
                First name
              </Form.Label>

              <Col sm={8}>
                <Form.Control required type="text" placeholder="First name" />
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
                <Form.Control required type="text" placeholder="Last name" />
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
                  type="text"
                  placeholder="Email Address"
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
                <Form.Control required type="password" placeholder="Password" />
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
                <Form.Control required type="text" placeholder="Event Name" />
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
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Event Description
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column md={4}>
                Date
              </Form.Label>

              <Col sm={8}>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  customInput={<CustomInput />}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Event Description
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column md={4}>
                Location
              </Form.Label>

              <Col sm={8}>
                <Form.Control required type="text" placeholder="Location" />
                <Form.Control.Feedback type="invalid">
                  Please enter location
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddEvent;
