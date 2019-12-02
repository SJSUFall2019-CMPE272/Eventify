import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  state = {
    show: false,
    email: "",
    password: "",
    logoutModal: false,
    fail: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  login = () => {
    console.log(this);
    this.props.history.push("/userhome");
  };

  onLogin = e => {
    e.preventDefault();
    //this.handleClose();
    this.setState({ answer: this.state.firstName + " " + this.state.password });
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    //axios.defaults.withCredentials = true;
    axios.post("http://localhost:5000/login", data).then(response => {
      console.log(response);
      if (response.data.authFlag === false) {
        // console.log("testing successful");
        this.setState({ fail: true });
      }
      if (response.data.authFlag === true && response.data.type === "Admin") {
        // console.log("testing successful");
        this.handleClose();
        sessionStorage.setItem("email", response.data.email_id);
        sessionStorage.setItem("privileges", "admin");
        this.props.history.push("/admin");
      }
      if (
        response.data.authFlag === true &&
        response.data.type === "Organizer"
      ) {
        this.handleClose();
        sessionStorage.setItem("privileges", "organizer");
        sessionStorage.setItem("email", response.data.email_id);
        this.props.history.push("/userhome");
      }
    });
  };

  logoutOpen = e => {
    this.setState({ logoutModal: true });
  };

  logoutClose = () => {
    this.setState({ logoutModal: false });
  };

  onLogout = e => {
    sessionStorage.clear();

    axios.post("http://localhost:5000/logout").then(response => {
      console.log(response);
    });
    this.logoutClose();
    this.props.history.push("/");
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
          <div className="login-item flex " onClick={e => this.logoutOpen(e)}>
            Logout
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <div style={{ fontSize: 16, color: "red" }}>
            {this.state.fail ? "Invalid Login Credentials" : ""}
          </div>
          <Modal.Body>
            <div>Please login using the details provided</div>
            <p></p>
            <div className="modal-container">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={e => this.onLogin(e)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={this.state.logoutModal} onHide={this.logoutClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to logout?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onLogout} variant="danger" size="sm">
              Yes
            </Button>
            <Button onClick={this.logoutClose} size="sm">
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Navbar);
