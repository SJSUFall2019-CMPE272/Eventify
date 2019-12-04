import React, { Component } from "react";
import "./UserCreate.scss";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class UserCreate extends Component {
  state = {
    validated: false,
    organizer_id: "",
    event_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_num: "",
    company_name: "",
    successModal: false
  };

  componentDidMount() {
    const name = this.props.match.params.id;
    this.setState({ event_name: name });

    axios.get("http://localhost:5000/getOrganizer/" + name).then(response => {
      if (response.data.message == "Report Found") {
        console.log(response, response.data.result[0].email);
        this.setState({ organizer_id: response.data.result[0].email });
      }
    });
  }

  handleSubmit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
      return;
    }
    e.preventDefault();

    let data = {
      organizer_id: this.state.organizer_id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      company_name: this.state.company_name,
      email: this.state.email,
      password: this.state.password,
      phone_num: this.state.phone_num
    };

    axios.post("http://localhost:5000/addUser", data).then(response => {
      if (response.data.message === "User added successfully") {
        this.setState({ successModal: true });
        this.resetForm();
      }
    });
    this.setState({ validated: false });
  };

  resetForm() {
    this.setState({
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      password: "",
      phone_num: ""
    });
  }

  successClose = () => {
    this.setState({ successModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-8 screen-wrapper margin-center">
          <div className="card create-login flex">
            <h2>Register for {this.state.event_name}!</h2>
            <br />
            <br />
            <Form
              className="col-sm-8"
              noValidate
              validated={this.state.validated}
              onSubmit={e => this.handleSubmit(e)}
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
                  Company Name
                </Form.Label>

                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Company Name"
                    value={this.state.company_name}
                    onChange={e =>
                      this.setState({ company_name: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter company name
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="submit-container">
                <Button type="submit" column md={4}>
                  Submit form
                </Button>
              </Form.Group>
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
            <h5>User added successfully!</h5>
            <Button onClick={this.successClose} size="sm" variant="success">
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserCreate;
