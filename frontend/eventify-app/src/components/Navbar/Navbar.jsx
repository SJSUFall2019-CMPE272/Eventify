import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
  state = {
    show: false,
    email:"",
    password:"",
    fail:false,
    login_success_admin:false,
    login_success_org:false
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

  onLogin = e =>{
    e.preventDefault();
    //this.handleClose();
    this.setState({answer:this.state.firstName+" "+this.state.password});
    let data ={
      email:this.state.email,
         password:this.state.password
    };
    axios
        .post("http://localhost:5000/login", data)
      .then((response) => 
      {
        
        console.log(response);
        if(response.data.authFlag ===false) 
        {
          // console.log("testing successful");
          this.setState({fail:true});
        }
        if(response.data.authFlag ===true && response.data.type==="Admin") 
        {
          // console.log("testing successful");
          this.handleClose();
          this.setState({login_success_admin:true});
        }
        if(response.data.authFlag ===true && response.data.type==="Organizer"){
          this.handleClose();
          this.setState({login_success_org:true});
        }
  
      }
      
      );
  };

  render() {
    let redirection="";
		if(this.state.login_success_admin === true){
			redirection = <Redirect to='/admin' />	
			// console.log("login success");
		}
		else if(this.state.login_success_org === true){
			redirection = <Redirect to='/userhome' />
		}
    return (
      <div className="navbar-wrapper flex">
        {redirection}
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
          <div style={{ fontSize: 16, color: "red" }}>
            {this.state.fail ? "Invalid Login Credentials" : ""}
						</div>
          <Modal.Body>
            <div>Please login using the details provided</div>
            <p></p>
            <div className="modal-container">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e=>this.setState({email:e.target.value})}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e=>this.setState({password:e.target.value})}/>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={e=>this.onLogin(e)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  
}

export default withRouter(Navbar);
