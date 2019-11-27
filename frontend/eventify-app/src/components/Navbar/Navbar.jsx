import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div className="navbar-wrapper flex">
        <div className="logo">
          <img src="images/logo.png" alt="logo" />
        </div>
        <div
          className={
            "login-container flex pointer " +
            (this.props.history.location.pathname == "/" ? "" : "hidden")
          }
        >
          <div className="login-item flex ">Contact Us</div>
          <div className="login-item flex " onClick={this.handleShow}>
            Login
          </div>
        </div>

        <div
          className={
            "login-container flex pointer " +
            (this.props.history.location.pathname != "/" ? "" : "hidden")
          }
        >
          <div className="login-item flex ">Logout</div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Please login using the details provided</div>
            <p></p>
            <div className="modal-container">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.login}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  login = () => {
    this.handleClose();
    console.log(this);
    this.props.history.push("/userhome");
  };
}

export default withRouter(Navbar);
