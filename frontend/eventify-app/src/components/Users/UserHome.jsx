import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class UserHome extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    this.render();
  }

  render() {
    let name = this.props.profile.event_name
      ? this.props.profile.event_name.split(" ").join("_")
      : "";
    return (
      <div className="tab-content user-profile pb-5">
        <h1 className="header">Welcome to Eventify! </h1>
        <div class="border-div"></div>
        <p>
          Please verify your details as shown below and use the options menu to
          change profile details or reset your password.
        </p>
        <p></p>
        <Form className="col-sm-6 profile-form">
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              First Name:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.first_name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Last Name:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.last_name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Email:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.email}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Phone Number:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.phone_num}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Event Name:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.event_name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Event Description:
            </Form.Label>
            <Col sm="6">
              <Form.Label>{this.props.profile.event_desc}</Form.Label>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Event Location:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={this.props.profile.event_location}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Event From:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={
                  new Date(
                    this.props.profile.event_date_from
                  ).toLocaleDateString() == "Invalid Date"
                    ? ""
                    : new Date(
                        this.props.profile.event_date_from
                      ).toLocaleDateString()
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Event To:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                readOnly
                defaultValue={
                  new Date(
                    this.props.profile.event_date_to
                  ).toLocaleDateString() == "Invalid Date"
                    ? ""
                    : new Date(
                        this.props.profile.event_date_to
                      ).toLocaleDateString()
                }
              />
            </Col>
          </Form.Group>
        </Form>

        <div className="col-sm-6 margin-center">
          Please use the following link to register users to your event:
          <br />
          <a href={"http://54.153.56.167/createuser/" + name}>
            {"http://54.153.56.167/createuser/" + name}
          </a>
        </div>
      </div>
    );
  }
}

export default UserHome;
