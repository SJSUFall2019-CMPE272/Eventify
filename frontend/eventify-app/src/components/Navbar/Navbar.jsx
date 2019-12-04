import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
  faSignInAlt,
  faPhoneAlt,
  faCheck,
  faUser,
  faKey,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  state = {
    show: false,
    email: "",
    password: "",
    firstName: "",
    logoutModal: false,
    fail: false,
    openSidebar: false,
    dropdownOpen: false,
    profileModal: false,
    passwordModal: false,
    first_name: "",
    last_name: "",
    email: "",
    phone_num: "",
    event_name: "",
    event_desc: "",
    currentPass: "",
    newPass: "",
    confirmPass: "",
    passwordError: ""
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
        return;
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
      sessionStorage.setItem("firstname", response.data.first_name);
      this.setState({ firstName: response.data.first_name });
      this.getProfile();
    });
  };

  getProfile() {
    axios
      .get("http://localhost:5000/profile/" + sessionStorage.getItem("email"))
      .then(response => {
        console.log(response.data.result);
        let result = response.data.result;
        this.setState({
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          phone_num: result.phone_num,
          event_name: result.event_name,
          event_desc: result.event_desc,
          event_location: result.event_location
        });
      });
  }

  onUpdate = e => {
    e.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_num: this.state.phone_num,
      event_name: this.state.event_name,
      event_desc: this.state.event_desc
    };
    console.log("in update function");
    axios.post("http://localhost:5000/events/update", data).then(response => {
      console.log(response.data.message);
      this.profileClose();
      window.location.reload(true);
    });
  };

  logoutOpen = e => {
    this.setState({ logoutModal: true, dropdownOpen: false });
  };

  logoutClose = () => {
    this.setState({ logoutModal: false });
  };

  logoutOpen = e => {
    this.setState({ logoutModal: true, dropdownOpen: false });
  };

  profileClose = () => {
    this.setState({ profileModal: false });
  };

  passwordClose = () => {
    this.setState({ passwordModal: false });
  };

  onLogout = e => {
    sessionStorage.clear();

    axios.post("http://localhost:5000/logout").then(response => {
      console.log(response);
    });
    this.logoutClose();
    this.props.history.push("/");
  };

  resetPassword() {
    if (this.state.newPass != this.state.confirmPass) {
      this.setState({ passwordError: true });
    }

    let data = {
      email: sessionStorage.getItem("email"),
      password: this.state.currentPass,
      new_password: this.state.newPass
    };

    axios.post("http://localhost:5000/resetPassword", data).then(response => {
      if (!response.data.message == "Password updated successfully") {
        this.setState({ passwordError: response.data.message });
      } else {
        alert(response.data.message);
        window.location.reload(true);
      }
    });
  }

  render() {
    return (
      <div className="navbar-wrapper flex">
        <div className="logo">
          <img src="images/logo.png" alt="logo" />
        </div>
        <div
          className={
            "login-container flex pointer " +
            (["organizer", "admin"].indexOf(
              sessionStorage.getItem("privileges")
            ) > -1
              ? "hidden"
              : "")
          }
        >
          <div className="login-item flex ">
            <FontAwesomeIcon icon={faPhoneAlt} />
            Contact Us
          </div>
          <div className="login-item flex " onClick={this.handleShow}>
            <FontAwesomeIcon icon={faSignInAlt} />
            Login
          </div>
        </div>

        <div
          className={
            "login-container flex pointer " +
            (["organizer", "admin"].indexOf(
              sessionStorage.getItem("privileges")
            ) > -1
              ? ""
              : "hidden")
          }
        >
          <div
            className={
              "login-item flex " + (this.state.dropdownOpen ? "selected" : "")
            }
            onClick={e =>
              this.setState({ dropdownOpen: !this.state.dropdownOpen })
            }
          >
            <FontAwesomeIcon icon={faUser} />
            {this.state.firstName || sessionStorage.getItem("firstname")}
          </div>
          <div
            className={
              "dropdown-options " + (this.state.dropdownOpen ? "show" : "")
            }
          >
            <div
              className={
                "options flex pointer " +
                (sessionStorage.getItem("privileges") == "organizer"
                  ? ""
                  : "hidden")
              }
              onClick={e => {
                this.getProfile();
                this.setState({ profileModal: true, dropdownOpen: false });
              }}
            >
              <FontAwesomeIcon icon={faUserEdit} />
              Edit Profile
            </div>
            <div
              className={
                "options flex pointer " +
                (sessionStorage.getItem("privileges") == "organizer"
                  ? ""
                  : "hidden")
              }
              onClick={e =>
                this.setState({ passwordModal: true, dropdownOpen: false })
              }
            >
              <FontAwesomeIcon icon={faKey} />
              Reset Password
            </div>
            <div
              className="options flex pointer"
              onClick={e => this.logoutOpen(e)}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </div>
          </div>

          {/* <div className="login-item flex " onClick={e => this.logoutOpen(e)}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </div> */}
        </div>

        <div
          className="sidebar-btn"
          onClick={e => this.setState({ openSidebar: true })}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div
          className={
            "sidebar-wrapper " + (this.state.openSidebar ? "show" : "")
          }
        >
          <div className="sidebar-header">
            <div
              className="sidebar-btn"
              onClick={e => this.setState({ openSidebar: false })}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="sidebar-body">
            <div
              className={
                "flex pointer " +
                (this.props.history.location.pathname == "/" ? "" : "hidden")
              }
            >
              <div className="login-item flex ">
                <FontAwesomeIcon icon={faPhoneAlt} />
                Contact Us
              </div>
              <div className="login-item flex " onClick={this.handleShow}>
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </div>
            </div>

            <div
              className={
                "flex pointer " +
                (this.props.history.location.pathname != "/" ? "" : "hidden")
              }
            >
              <div
                className="login-item flex "
                onClick={e => this.logoutOpen(e)}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN MODAL */}

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
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </InputGroup>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={e => this.onLogin(e)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>

        {/* LOGOUT MODAL */}
        <Modal centered show={this.state.logoutModal} onHide={this.logoutClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to logout?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onLogout} variant="danger" size="sm">
              <FontAwesomeIcon icon={faCheck} />
              Yes
            </Button>
            <Button onClick={this.logoutClose} size="sm">
              <FontAwesomeIcon icon={faTimes} />
              No
            </Button>
          </Modal.Footer>
        </Modal>

        {/* EDIT PROFILE MODAL */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.profileModal}
          onHide={this.profileClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tab-body">
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
                      onChange={e =>
                        this.setState({ last_name: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter last name.
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
                      onChange={e =>
                        this.setState({ phone_num: e.target.value })
                      }
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
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={e => {
                this.onUpdate(e);
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.passwordModal}
          onHide={this.passwordClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Reset Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={
                "text-danger " +
                (this.state.passwordError != "" ? "" : "hidden")
              }
            >
              <p>
                <center>{this.state.passwordError}</center>
              </p>
            </div>
            <Form.Group as={Row}>
              <Form.Label column md={4}>
                Current Password
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={this.state.currentPass}
                  onChange={e => this.setState({ currentPass: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={4}>
                New Password
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={this.state.newPass}
                  onChange={e => this.setState({ newPass: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md={4}>
                Confirm Password
              </Form.Label>

              <Col sm={8}>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={this.state.confirmPass}
                  onChange={e => this.setState({ confirmPass: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Password.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.resetPassword(e)}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Navbar);
